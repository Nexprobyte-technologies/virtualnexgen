"use client";

import { useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link2,
  RemoveFormatting,
  Heading2,
  Heading3,
  Heading4,
  Type,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  rows?: number;
}

const COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff",
  "#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff",
  "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
  "#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd",
  "#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0",
  "#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79",
  "#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47",
  "#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130",
];

export default function RichTextEditor({ value, onChange, rows = 8 }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const execCmd = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertHeading = useCallback((tag: string) => {
    execCmd("formatBlock", `<${tag}>`);
  }, [execCmd]);

  const insertParagraph = useCallback(() => {
    execCmd("formatBlock", "<p>");
  }, [execCmd]);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) execCmd("createLink", url);
  }, [execCmd]);

  const insertHR = useCallback(() => {
    execCmd("insertHorizontalRule");
  }, [execCmd]);

  const handleColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    execCmd("foreColor", e.target.value);
  }, [execCmd]);

  const ToolbarButton = ({
    onClick,
    title,
    children,
    active = false,
  }: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
    active?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
        active
          ? "bg-brand/20 text-brand-dark"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );

  const Separator = () => (
    <div className="mx-1 h-6 w-px bg-gray-300" />
  );

  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
        {/* Headings */}
        <ToolbarButton onClick={() => insertHeading("h2")} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => insertHeading("h3")} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => insertHeading("h4")} title="Heading 4">
          <Heading4 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertParagraph} title="Paragraph">
          <Type className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* Text formatting */}
        <ToolbarButton onClick={() => execCmd("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        {/* Increase Font Size +20px */}
        <ToolbarButton onClick={() => execCmd("fontSize", "7")} title="Increase Font (+20px)">
          <span className="text-xs font-bold" style={{ fontSize: "20px" }}>A</span>
        </ToolbarButton>
        {/* Increase Font Size +10px */}
        <ToolbarButton onClick={() => execCmd("fontSize", "5")} title="Increase Font (+10px)">
          <span className="text-xs font-bold" style={{ fontSize: "14px" }}>A</span>
        </ToolbarButton>

        <Separator />

        {/* Lists */}
        <ToolbarButton onClick={() => execCmd("insertUnorderedList")} title="Bullet List">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("insertOrderedList")} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* Block */}
        <ToolbarButton onClick={() => execCmd("formatBlock", "blockquote")} title="Quote">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertHR} title="Horizontal Line">
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* Link */}
        <ToolbarButton onClick={insertLink} title="Insert Link">
          <Link2 className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* Color picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => colorPickerRef.current?.click()}
            title="Text Color"
            className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <span className="text-sm font-bold">A</span>
            <div className="h-1 w-4 rounded-sm bg-black" />
          </button>
          <input
            ref={colorPickerRef}
            type="color"
            onChange={handleColor}
            className="absolute bottom-0 left-0 h-0 w-0 opacity-0"
          />
        </div>

        {/* Preset colors */}
        <div className="flex items-center gap-0.5">
          {["#000000", "#e06666", "#f6b26b", "#93c47d", "#6d9eeb", "#8e7cc3"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => execCmd("foreColor", c)}
              title={c}
              className="h-5 w-5 rounded-sm border border-gray-300"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <Separator />

        {/* Clear formatting */}
        <ToolbarButton onClick={() => execCmd("removeFormat")} title="Clear Formatting">
          <RemoveFormatting className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="min-h-[200px] max-h-[500px] overflow-y-auto px-4 py-3 text-sm text-gray-900 focus:outline-none prose prose-sm max-w-none"
        style={{ minHeight: `${rows * 1.5}rem` }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
