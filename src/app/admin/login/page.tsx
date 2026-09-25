"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Login failed");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-deep to-brand px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2rem] border border-line bg-white/95 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="icon-tile h-14 w-14">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-ink">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Sign in to manage your services
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink/70">
              Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
              placeholder="admin"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink/70">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
              placeholder="••••••••"
            />
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-cream-2 px-4 py-2.5 text-sm font-medium text-ink/70">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(249,115,22,0.35)] transition hover:shadow-[0_12px_40px_rgba(249,115,22,0.5)] disabled:opacity-60"
        >
          {loading ? (
            <>
              <Lock className="h-4 w-4 animate-pulse" /> Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" /> Sign In
            </>
          )}
        </button>
      </form>
    </div>
  );
}