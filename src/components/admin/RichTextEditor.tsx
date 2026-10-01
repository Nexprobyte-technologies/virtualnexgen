"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Code,
  CornerDownLeft,
  FileCode,
  Heading1,
  Heading2,
  Heading3,
  HelpCircle,
  Image as ImageIcon,
  Indent,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Outdent,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo,
  Unlink,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write blog content here...",
  minHeight = "320px",
}: RichTextEditorProps) {
  const [showSource, setShowSource] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current && !showSource) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, showSource]);

  function execCommand(command: string, value: string | undefined = undefined) {
    if (showSource) return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      isUpdatingRef.current = true;
      onChange(html);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  }

  function handleEditorInput() {
    if (editorRef.current && !showSource) {
      const html = editorRef.current.innerHTML;
      isUpdatingRef.current = true;
      onChange(html);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  }

  function insertLink() {
    const url = prompt("Enter URL:", "https://");
    if (url) execCommand("createLink", url);
  }

  function insertImage() {
    const url = prompt("Enter Image URL:", "https://");
    if (url) execCommand("insertImage", url);
  }

  function insertTable() {
    const tableHtml = `
      <table border="1" style="width:100%; border-collapse:collapse; margin:10px 0;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="padding:8px; border:1px solid #cbd5e1;">Header 1</th>
            <th style="padding:8px; border:1px solid #cbd5e1;">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:8px; border:1px solid #cbd5e1;">Data 1</td>
            <td style="padding:8px; border:1px solid #cbd5e1;">Data 2</td>
          </tr>
        </tbody>
      </table><p></p>
    `;
    execCommand("insertHTML", tableHtml);
  }

  function applyBlockStyle(tag: string) {
    if (tag === "p") execCommand("formatBlock", "P");
    else if (tag === "h2") execCommand("formatBlock", "H2");
    else if (tag === "h3") execCommand("formatBlock", "H3");
    else if (tag === "h4") execCommand("formatBlock", "H4");
    else if (tag === "blockquote") execCommand("formatBlock", "BLOCKQUOTE");
    else if (tag === "pre") execCommand("formatBlock", "PRE");
  }

  return (
    <div
      className={`rounded-xl border border-slate-300 bg-white shadow-sm transition-all overflow-hidden flex flex-col ${
        isFullscreen ? "fixed inset-4 z-50 shadow-2xl border-slate-400" : "w-full"
      }`}
    >
      {/* Top Toolbar - CKEditor style */}
      <div className="bg-slate-100/90 border-b border-slate-200 p-2 flex flex-wrap gap-1 items-center text-slate-700 text-xs shrink-0 select-none">
        {/* Row 1: Actions */}
        <div className="flex items-center gap-0.5 border-r border-slate-300 pr-2 mr-1">
          <button
            type="button"
            onClick={() => execCommand("undo")}
            title="Undo"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition"
          >
            <Undo className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("redo")}
            title="Redo"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition"
          >
            <Redo className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Links & Media */}
        <div className="flex items-center gap-0.5 border-r border-slate-300 pr-2 mr-1">
          <button
            type="button"
            onClick={insertLink}
            title="Insert Link"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition"
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("unlink")}
            title="Remove Link"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition"
          >
            <Unlink className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={insertImage}
            title="Insert Image"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition"
          >
            <ImageIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={insertTable}
            title="Insert Table"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition"
          >
            <TableIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Source Code Toggle */}
        <div className="flex items-center gap-1 border-r border-slate-300 pr-2 mr-1">
          <button
            type="button"
            onClick={() => setShowSource(!showSource)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition ${
              showSource
                ? "bg-brand text-white shadow-sm"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
            title="Toggle Source HTML"
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Source</span>
          </button>
        </div>

        {/* Row 2: Formatting */}
        <div className="flex items-center gap-0.5 border-r border-slate-300 pr-2 mr-1">
          <button
            type="button"
            onClick={() => execCommand("bold")}
            title="Bold"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-800 font-bold transition"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("italic")}
            title="Italic"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-800 italic transition"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("underline")}
            title="Underline"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-800 transition"
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("strikeThrough")}
            title="Strikethrough"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-800 transition"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("removeFormat")}
            title="Clear Formatting"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition"
          >
            <RemoveFormatting className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Lists & Indent */}
        <div className="flex items-center gap-0.5 border-r border-slate-300 pr-2 mr-1">
          <button
            type="button"
            onClick={() => execCommand("insertUnorderedList")}
            title="Bulleted List"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
          >
            <List className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("insertOrderedList")}
            title="Numbered List"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("outdent")}
            title="Outdent"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
          >
            <Outdent className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("indent")}
            title="Indent"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
          >
            <Indent className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "BLOCKQUOTE")}
            title="Quote"
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Paragraph & Headings Select */}
        <div className="flex items-center gap-1 border-r border-slate-300 pr-2 mr-1">
          <select
            onChange={(e) => applyBlockStyle(e.target.value)}
            defaultValue="p"
            className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-700 outline-none cursor-pointer hover:border-slate-400"
          >
            <option value="p">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="blockquote">Quote Block</option>
            <option value="pre">Code Block</option>
          </select>
        </div>

        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 min-h-0 bg-white overflow-y-auto" style={{ minHeight }}>
        {showSource ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-4 font-mono text-xs text-slate-800 bg-slate-900 text-slate-100 outline-none resize-none border-none leading-relaxed"
            placeholder="Edit raw HTML code..."
            style={{ minHeight }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onBlur={handleEditorInput}
            className="w-full h-full p-4 text-sm text-slate-800 outline-none leading-relaxed prose max-w-none focus:outline-none overflow-y-auto"
            style={{ minHeight }}
          />
        )}
      </div>

      {/* Footer bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-3 py-1 text-[11px] text-slate-500 flex items-center justify-between shrink-0">
        <span>{showSource ? "HTML Source Mode" : "Visual WYSIWYG Mode"}</span>
        <span>{value ? value.replace(/<[^>]*>/g, "").length : 0} characters</span>
      </div>
    </div>
  );
}
