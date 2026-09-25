"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mic,
  MicOff,
  Play,
  Plus,
  RefreshCw,
  Save,
  Send,
  Trash2,
  Upload,
  Volume2,
  X,
} from "lucide-react";
import type { ChatbotEntry } from "@/lib/types";

interface RowDraft {
  id: string;
  question: string;
  answer: string;
  audioUrl: string;
  editedId: string | null;
}

const MAX_ROWS = 8;

function makeRow(): RowDraft {
  return { id: crypto.randomUUID(), question: "", answer: "", audioUrl: "", editedId: null };
}

export default function AdminChatbot() {
  const [entries, setEntries] = useState<ChatbotEntry[]>([]);
  const [rows, setRows] = useState<RowDraft[]>(() => [makeRow()]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [recordingRow, setRecordingRow] = useState<string | null>(null);
  const recordersRef = useRef<Record<string, MediaRecorder>>({});
  const chunksRef = useRef<Record<string, Blob[]>>({});
  const timersRef = useRef<Record<string, number>>({});

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/chatbot");
      const data = await res.json();
      setEntries(data.entries ?? []);
    } catch {
      setMessage({ type: "err", text: "Failed to load chatbot entries." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    return () => {
      Object.values(recordersRef.current).forEach((r) => {
        if (r.state !== "inactive") r.stop();
      });
      Object.values(timersRef.current).forEach(window.clearTimeout);
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (drawerOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  function updateRow(index: number, patch: Partial<RowDraft>) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }

  async function stopRecording(rowId: string) {
    const recorder = recordersRef.current[rowId];
    if (!recorder || recorder.state === "inactive") return;
    recorder.stop();
  }

  async function toggleRecord(index: number) {
    const row = rows[index];
    if (recordingRow === row.id) {
      stopRecording(row.id);
      return;
    }
    if (typeof navigator === "undefined" || !navigator.mediaDevices) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mime = ["audio/webm", "audio/mp4", "audio/ogg", "audio/wav"].find((t) =>
      MediaRecorder.isTypeSupported(t),
    );
    const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);

    chunksRef.current[row.id] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current[row.id].push(e.data);
    };
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current[row.id], {
        type: recorder.mimeType || "audio/webm",
      });
      const form = new FormData();
      form.append("audio", blob, `recording-${Date.now()}.webm`);
      try {
        const res = await fetch("/api/chatbot/upload", { method: "POST", body: form });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.url) {
          updateRow(index, { audioUrl: data.url });
          setMessage({ type: "ok", text: `Voice note saved successfully for entry ${index + 1}!` });
          window.setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: "err", text: data?.error ?? "Audio upload failed." });
        }
      } catch {
        setMessage({ type: "err", text: "Audio upload failed." });
      }
      stream.getTracks().forEach((t) => t.stop());
      setRecordingRow(null);
      delete recordersRef.current[row.id];
      delete chunksRef.current[row.id];
      if (timersRef.current[row.id]) {
        window.clearTimeout(timersRef.current[row.id]);
        delete timersRef.current[row.id];
      }
    };
    recordersRef.current[row.id] = recorder;
    setRecordingRow(row.id);
    recorder.start();
    timersRef.current[row.id] = window.setTimeout(
      () => stopRecording(row.id),
      30000,
    );
  }

  async function uploadAudioFile(index: number, file: File) {
    const form = new FormData();
    form.append("audio", file);
    const res = await fetch("/api/chatbot/upload", { method: "POST", body: form });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.url) {
      updateRow(index, { audioUrl: data.url });
      setMessage({ type: "ok", text: "Audio uploaded." });
      window.setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "err", text: data?.error ?? "Audio upload failed." });
    }
  }

  async function sendRow(index: number) {
  const row = rows[index];
  if (!row.question.trim() && !row.answer.trim()) return;
  setSaving(true);
  setMessage(null);
  try {
    const body = JSON.stringify({
      question: row.question,
      answer: row.answer,
      audio: row.audioUrl,
    });
    const res = await fetch(
      row.editedId ? `/api/chatbot/${row.editedId}` : "/api/chatbot",
      { method: row.editedId ? "PUT" : "POST", body, headers: { "Content-Type": "application/json" } },
    );
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error ?? "Save failed");
    }
    setMessage({ type: "ok", text: `Entry ${index + 1} sent to the chatbot!` });
    window.setTimeout(() => setMessage(null), 3000);
    setRows((prev) => prev.filter((_, i) => i !== index));
    await load();
  } catch (err) {
    setMessage({
      type: "err",
      text: err instanceof Error ? err.message : "Save failed.",
    });
  } finally {
    setSaving(false);
  }
}

async function handleSave() {
  const draft = rows.filter((r) => r.question.trim() || r.answer.trim());
  if (draft.length === 0) return;
    setSaving(true);
    setMessage(null);
    try {
      for (const row of draft) {
        const body = JSON.stringify({
          question: row.question,
          answer: row.answer,
          audio: row.audioUrl,
        });
        const res = await fetch(
          row.editedId ? `/api/chatbot/${row.editedId}` : "/api/chatbot",
          { method: row.editedId ? "PUT" : "POST", body, headers: { "Content-Type": "application/json" } },
        );
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Save failed");
        }
      }
      setMessage({
        type: "ok",
        text: `Saved ${draft.length} chatbot entr${draft.length === 1 ? "y" : "ies"} successfully!`,
      });
      window.setTimeout(() => setMessage(null), 3000);
      setRows([makeRow()]);
      await load();
    } catch (err) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(entry: ChatbotEntry) {
    if (rows.some((r) => r.editedId === entry.id)) return;
    if (rows.length >= MAX_ROWS) {
      setMessage({ type: "err", text: "Too many rows. Save or remove some entries first." });
      window.setTimeout(() => setMessage(null), 3000);
      return;
    }
    setRows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        question: entry.question,
        answer: entry.answer,
        audioUrl: entry.audio,
        editedId: entry.id,
      },
    ]);
    setDrawerOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this chatbot entry? This cannot be undone.")) return;
    const res = await fetch(`/api/chatbot/${id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
    } else {
      setMessage({ type: "err", text: "Failed to delete entry." });
    }
  }

  function playAnswer(entry: ChatbotEntry) {
    window.speechSynthesis?.cancel();
    if (entry.audio) {
      new Audio(entry.audio).play().catch(() => {});
    } else if (entry.answer) {
      const utter = new SpeechSynthesisUtterance(entry.answer);
      window.speechSynthesis?.speak(utter);
    }
  }

  function playRowAudio(row: RowDraft) {
    if (row.audioUrl) new Audio(row.audioUrl).play().catch(() => {});
  }

  const readyCount = rows.filter((r) => r.question.trim() || r.answer.trim()).length;

  const totalPages = Math.max(Math.ceil(entries.length / pageSize), 1);
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const paginatedEntries = entries.slice((page - 1) * pageSize, page * pageSize);

  function pageList(current: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set<number>([1, total, current - 1, current, current + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    const out: (number | "…")[] = [];
    let prev = 0;
    for (const p of sorted) {
      if (p - prev > 1) out.push("…");
      out.push(p);
      prev = p;
    }
    return out;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/15 text-brand-dark">
              <Bot className="h-5 w-5" />
            </span>
            Chatbot Knowledge Base
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage what the site chatbot knows — questions, answers and voice notes.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (rows.length < MAX_ROWS) {
                setRows((prev) => [...prev, { id: crypto.randomUUID(), question: "", answer: "", audioUrl: "", editedId: null }]);
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] transition hover:shadow-[0_4px_20px_rgba(249,115,22,0.45)]"
          >
            <Plus className="h-3.5 w-3.5" /> Add Entry
          </button>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-brand hover:text-brand-dark"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Saved Entries
          </p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{entries.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            How it works
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Click <span className="font-semibold text-brand-dark">Add / Edit Entries</span> below —
            a panel opens from the right. Fill in the question, type or{" "}
            <span className="font-semibold">record the answer in audio</span>, keep adding
            entries one after another, then hit <span className="font-semibold text-brand-dark">Save All</span>.
          </p>
        </div>
      </div>

      {message && (
        <p
          className={`rounded-xl border px-4 py-3 text-sm font-medium ${
            message.type === "ok"
              ? "border-emerald-100 bg-emerald-50 text-emerald-700"
              : "border-cream-2 bg-cream-2 text-ink/70"
          }`}
        >
          {message.text}
        </p>
      )}

      {!drawerOpen && (
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/40 bg-brand/5 px-6 py-6 text-sm font-semibold text-brand-dark transition hover:border-brand hover:bg-brand/10"
        >
          <Plus className="h-5 w-5" /> Add / Edit Entries
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/40">
          <div
            className="absolute inset-0 cursor-default"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <aside className="relative flex h-full w-[min(94vw,480px)] flex-col overflow-hidden bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/15 text-brand-dark">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {rows.some((r) => r.editedId) ? "Edit Chatbot Entries" : "Add Chatbot Entries"}
                  </p>
                  <p className="text-[11px] text-slate-400">Opens from the right side</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close panel"
                className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-cream-2 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Next Entry
                </p>
                {rows.length < MAX_ROWS && (
                  <button
                    type="button"
                    onClick={() => setRows((prev) => [...prev, makeRow()])}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-brand hover:text-brand-dark"
                  >
                    <Plus className="h-3.5 w-3.5" /> Next Entry
                  </button>
                )}
              </div>

              {rows.map((row, index) => (
                <div key={row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Entry {index + 1}
                      {row.editedId && (
                        <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 normal-case">
                          editing existing
                        </span>
                      )}
                    </p>
                    {rows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}
                        className="grid h-6 w-6 place-items-center rounded-md bg-white text-slate-400 shadow-sm transition hover:text-ink"
                        aria-label={`Remove entry ${index + 1}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <input
                    value={row.question}
                    onChange={(e) => updateRow(index, { question: e.target.value })}
                    placeholder="Question (e.g. How do I add a new service?)"
                    className="mb-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                  />
                  <textarea
                    value={row.answer}
                    onChange={(e) => updateRow(index, { answer: e.target.value })}
                    rows={2}
                    placeholder="Answer (type here, or record a voice note below)"
                    className="mb-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleRecord(index)}
                      disabled={recordingRow !== null && recordingRow !== row.id}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold shadow-sm transition ${
                        recordingRow === row.id
                          ? "animate-pulse bg-brand text-ink"
                          : "bg-white text-slate-700 hover:text-brand-dark"
                      } disabled:opacity-40`}
                    >
                      {recordingRow === row.id ? (
                        <>
                          <MicOff className="h-3.5 w-3.5" /> Recording... tap to stop
                        </>
                      ) : (
                        <>
                          <Mic className="h-3.5 w-3.5" /> Record Voice
                        </>
                      )}
                    </button>
                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:text-brand-dark">
                      <Upload className="h-3.5 w-3.5" /> Upload Audio
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) uploadAudioFile(index, f);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <input
                      value={row.audioUrl}
                      onChange={(e) => updateRow(index, { audioUrl: e.target.value })}
                      placeholder="...or paste audio URL"
                      className="min-w-[140px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-brand"
                    />
                    {row.audioUrl && (
                      <button
                        type="button"
                        onClick={() => playRowAudio(row)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:text-brand-dark"
                      >
                        <Play className="h-3.5 w-3.5" /> Play
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => sendRow(index)}
                      disabled={saving || (!row.question.trim() && !row.answer.trim())}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(249,115,22,0.3)] transition hover:shadow-[0_8px_32px_rgba(249,115,22,0.45)] disabled:opacity-40"
                    >
                      <Send className="h-3.5 w-3.5" /> Send
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)] transition hover:shadow-[0_10px_36px_rgba(249,115,22,0.45)] disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save All Entries
                    </>
                  )}
                </button>
                <span className="text-xs text-slate-400">
                  {readyCount} entr{readyCount === 1 ? "y" : "ies"} ready to save
                </span>
              </div>
            </div>
          </aside>
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Volume2 className="h-4 w-4 text-brand-dark" /> Saved Entries
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {entries.length}
            </span>
          </h3>
        </div>

        {loading ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            Loading entries...
          </p>
        ) : entries.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            No chatbot entries yet — open the panel and add your first one.
          </p>
        ) : (
          <>
            <ul className="divide-y divide-slate-100">
            {paginatedEntries.map((entry) => (
              <li key={entry.id} className="flex items-start gap-3 p-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-dark">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800">
                    {entry.question.trim() ? entry.question : "(Default fallback answer)"}
                  </p>
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-slate-500">
                    {entry.answer}
                  </p>
                  {entry.audio && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-brand-dark">
                      <Volume2 className="h-3.5 w-3.5" /> Has voice note
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => playAnswer(entry)}
                    aria-label="Play answer"
                    className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-brand/10 hover:text-brand-dark"
                  >
                    {entry.audio ? <Play className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(entry)}
                    aria-label="Edit entry"
                    className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-brand/10 hover:text-brand-dark"
                  >
                    <Bot className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    aria-label="Delete entry"
                    className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-cream-2 hover:text-ink"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
</ul>
            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {(page - 1) * pageSize + 1}–
                    {Math.min(page * pageSize, entries.length)}
                  </span>{" "}
                  of <span className="font-semibold text-slate-700">{entries.length}</span>
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {pageList(page, totalPages).map((pg, i) =>
                    pg === "…" ? (
                      <span key={`e-${i}`} className="px-1 text-xs text-slate-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={pg}
                        type="button"
                        onClick={() => setCurrentPage(pg)}
                        aria-label={`Page ${pg}`}
                        aria-current={pg === page ? "page" : undefined}
                        className={`min-w-[2rem] rounded-lg px-2 text-sm font-semibold transition ${
                          pg === page
                            ? "bg-gradient-to-r from-brand-deep to-brand text-white shadow"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand-dark"
                        }`}
                      >
                        {pg}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    aria-label="Next page"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}