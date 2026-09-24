"use client";

import { useRef, useCallback, useEffect, useState } from "react";
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
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Text,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  rows?: number;
}

const HEADING_OPTIONS = [
  { label: "Paragraph", value: "p" },
  { label: "H1", value: "h1" },
  { label: "H2", value: "h2" },
  { label: "H3", value: "h3" },
  { label: "H4", value: "h4" },
  { label: "H5", value: "h5" },
  { label: "H6", value: "h6" },
];

const FONT_SIZES = [
  { label: "Small (12px)", value: "1" },
  { label: "Normal (16px)", value: "3" },
  { label: "Large (18px)", value: "4" },
  { label: "Larger (24px)", value: "5" },
  { label: "Huge (32px)", value: "6" },
  { label: "Biggest (42px)", value: "7" },
];

const FONT_PX: Record<string, string> = {
  "1": "12px",
  "2": "14px",
  "3": "16px",
  "4": "18px",
  "5": "24px",
  "6": "32px",
  "7": "42px",
};

const LINE_HEIGHTS = [
  { label: "Tight (1.2)", value: "1.2" },
  { label: "Normal (1.5)", value: "1.5" },
  { label: "Relaxed (1.8)", value: "1.8" },
  { label: "Loose (2.2)", value: "2.2" },
];

const PRESET_COLORS = [
  "#111827",
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#16a34a",
  "#0d9488",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#6b7280",
];

const BLOCK_TAGS = /^(P|H[1-6]|DIV|LI|BLOCKQUOTE)$/;

export default function RichTextEditor({ value, onChange, rows = 8 }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const [openDropdown, setOpenDropdown] = useState<"heading" | "size" | "line" | null>(null);
  const [activeHeading, setActiveHeading] = useState("p");
  const [activeColor, setActiveColor] = useState("#111827");

  /* Track current block tag under caret for heading dropdown label */
  useEffect(() => {
    function syncBlockFormat() {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      let node: Node | null = sel.anchorNode;
      while (node) {
        if (node instanceof HTMLElement && BLOCK_TAGS.test(node.tagName)) {
          setActiveHeading(node.tagName.toLowerCase());
          return;
        }
        node = node.parentNode;
      }
    }
    document.addEventListener("selectionchange", syncBlockFormat);
    return () => document.removeEventListener("selectionchange", syncBlockFormat);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-rte-dropdown]")) setOpenDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const emit = useCallback(() => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const execCmd = useCallback(
    (command: string, val?: string) => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      document.execCommand(command, false, val);
      emit();
    },
    [emit]
  );

  /* Convert execCommand <font size="n"> tags into clean <span style="font-size"> */
  const normalizeFontTags = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    el.querySelectorAll("font[size]").forEach((font) => {
      const span = document.createElement("span");
      span.style.fontSize = FONT_PX[font.getAttribute("size") || "3"] || "16px";
      while (font.firstChild) span.appendChild(font.firstChild);
      font.replaceWith(span);
    });
  }, []);

  const applyFontSize = useCallback(
    (size: string) => {
      execCmd("fontSize", size);
      normalizeFontTags();
      emit();
      setOpenDropdown(null);
    },
    [execCmd, normalizeFontTags, emit]
  );

  const applyColor = useCallback(
    (color: string) => {
      setActiveColor(color);
      execCmd("foreColor", color);
    },
    [execCmd]
  );

  /* Apply line-height to selected blocks (or the caret's block when nothing selected) */
  const applyLineHeight = useCallback(
    (lh: string) => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();

      const blocks = new Set<HTMLElement>();
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
        const range = sel.getRangeAt(0);
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
        while (walker.nextNode()) {
          const node = walker.currentNode as HTMLElement;
          if (BLOCK_TAGS.test(node.tagName) && range.intersectsNode(node)) {
            blocks.add(node);
          }
        }
      }
      if (blocks.size === 0 && sel) {
        let node: Node | null = sel.anchorNode;
        while (node && node !== el) {
          if (node instanceof HTMLElement && BLOCK_TAGS.test(node.tagName)) {
            blocks.add(node);
            break;
          }
          node = node.parentNode;
        }
      }
      blocks.forEach((block) => {
        block.style.lineHeight = lh;
        block.querySelectorAll<HTMLElement>("span, strong, em, b, i").forEach((child) => {
          child.style.lineHeight = "";
        });
      });
      emit();
      setOpenDropdown(null);
    },
    [emit]
  );

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) execCmd("createLink", url);
  }, [execCmd]);

  const handleInput = useCallback(() => emit(), [emit]);

  function toggleDropdown(name: "heading" | "size" | "line") {
    setOpenDropdown((cur) => (cur === name ? null : name));
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
        {/* Heading dropdown */}
        <div className="relative" data-rte-dropdown>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown("heading")}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            {HEADING_OPTIONS.find((o) => o.value === activeHeading)?.label ?? "Paragraph"}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {openDropdown === "heading" && (
            <div className="absolute left-0 top-full z-50 mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              {HEADING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => execCmd("formatBlock", `<${opt.value}>`)}
                  className={`block w-full px-3 py-1.5 text-left text-sm transition hover:bg-gray-100 ${
                    opt.value === activeHeading
                      ? "bg-brand/10 font-semibold text-brand-dark"
                      : "text-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Font size dropdown */}
        <div className="relative" data-rte-dropdown>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown("size")}
            title="Font Size"
            className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <Text className="h-4 w-4" />
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {openDropdown === "size" && (
            <div className="absolute left-0 top-full z-50 mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              {FONT_SIZES.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyFontSize(opt.value)}
                  className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Line height dropdown */}
        <div className="relative" data-rte-dropdown>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown("line")}
            title="Line Spacing"
            className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <AlignJustify className="h-4 w-4" />
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {openDropdown === "line" && (
            <div className="absolute left-0 top-full z-50 mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              {LINE_HEIGHTS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyLineHeight(opt.value)}
                  className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Divider />

        <ToolbarButton onClick={() => execCmd("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("underline")} title="Underline">
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("strikeThrough")} title="Strikethrough">
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => execCmd("justifyLeft")} title="Align Left">
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("justifyCenter")} title="Align Center">
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("justifyRight")} title="Align Right">
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => execCmd("insertUnorderedList")} title="Bullet List">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("insertOrderedList")} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => execCmd("formatBlock", "<blockquote>")}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd("insertHorizontalRule")} title="Horizontal Line">
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={insertLink} title="Insert Link">
          <Link2 className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Custom color picker */}
        <div className="relative" data-rte-dropdown>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => colorPickerRef.current?.click()}
            title="Text Color"
            className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-gray-600 transition hover:bg-gray-100"
          >
            <span className="text-sm font-bold" style={{ color: activeColor }}>
              A
            </span>
            <span className="h-1.5 w-4 rounded-sm" style={{ backgroundColor: activeColor }} />
          </button>
          <input
            ref={colorPickerRef}
            type="color"
            value={activeColor}
            onChange={(e) => applyColor(e.target.value)}
            className="absolute bottom-0 left-0 h-0 w-0 opacity-0"
          />
        </div>

        {/* Preset colors */}
        <div className="flex items-center gap-0.5">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyColor(c)}
              title={c}
              className="h-5 w-5 rounded-sm border border-gray-300 transition hover:scale-110"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <Divider />

        <ToolbarButton onClick={() => execCmd("removeFormat")} title="Clear Formatting">
          <RemoveFormatting className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor surface */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        className="prose prose-sm max-w-none min-h-[220px] max-h-[520px] overflow-y-auto px-4 py-3 text-sm leading-relaxed text-gray-900 focus:outline-none [&:empty]:before:text-gray-400 [&:empty]:before:content-['Write_your_content_here...']"
        style={{ minHeight: `${Math.max(rows * 1.6, 13)}rem` }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 transition hover:bg-gray-200/70 hover:text-gray-900"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px bg-gray-300" />;
}
