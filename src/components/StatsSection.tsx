import { useState } from "react"
import Spinner from "./Spinner"
import { getStats } from "../services/api"

interface Stats {
  slug: string
  targetUrl: string
  clickCount: number
  createdAt: string
  expiratesAt: string
  expirated: boolean
}


function extractSlug(input: string): string {
  try {
    const url = new URL(input)
    return url.pathname.replace("/", "").trim()
  } catch {
    return input.trim()
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export default function StatsSection() {
  const [slug, setSlug] = useState("")
  const [loadingStats, setLoadingStats] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleViewStats() {
    const cleanSlug = extractSlug(slug)
    if (!cleanSlug) return
    setLoadingStats(true)
    setError(null)
    setStats(null)

    try {
      const data = await getStats(cleanSlug)
      setStats(data)
    } catch {
      setError("Slug não encontrada ou inválida.")
    } finally {
      setLoadingStats(false)
    }
  }

  return (
    <div>
        <label className="block text-[#6b6a65] text-[11px] uppercase tracking-widest font-mono mb-2">
        Ver estatísticas
        </label>
        <div className="flex gap-2">
            <input
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setStats(null); setError(null) }}
                onKeyDown={(e) => e.key === "Enter" && handleViewStats()}
                placeholder="slug ou URL completa"
                className="flex-1 bg-[#0f0f0e] border border-[#2e2d2a] rounded-lg px-4 py-2.5 text-sm text-[#e8e6e0] placeholder-[#3e3d39] font-mono outline-none focus:border-[#5a5652] transition-colors"
            />
            <button
                onClick={handleViewStats}
                disabled={loadingStats || !slug.trim()}
                className="w-28 flex items-center justify-center bg-[#e8e6e0] text-[#0f0f0e] rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {loadingStats ? <Spinner /> : "Ver stats →"}
            </button>
        </div>

        <div className="mt-3 min-h-[88px]">
            {error && (
            <p className="text-[#e24b4a] text-xs font-mono mt-1">{error}</p>
            )}

            {stats && (
            <div className="bg-[#0f0f0e] border border-[#2e2d2a] rounded-lg px-4 py-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                <span className="text-[#6b6a65] text-xs font-mono">slug</span>
                <span className="text-[#e8e6e0] text-xs font-mono">{stats.slug}</span>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-[#6b6a65] text-xs font-mono">destino</span>
                <span className="text-[#e8e6e0] text-xs font-mono truncate max-w-[260px]">{stats.targetUrl}</span>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-[#6b6a65] text-xs font-mono">cliques</span>
                <span className="text-[#e8e6e0] text-xs font-mono">{stats.clickCount}</span>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-[#6b6a65] text-xs font-mono">criado em</span>
                <span className="text-[#e8e6e0] text-xs font-mono">{formatDate(stats.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-[#6b6a65] text-xs font-mono">expira em</span>
                <span className="text-[#e8e6e0] text-xs font-mono">{formatDate(stats.expiratesAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-[#6b6a65] text-xs font-mono">status</span>
                <span className={`text-xs font-mono ${stats.expirated ? "text-[#e24b4a]" : "text-[#4ade80]"}`}>
                    {stats.expirated ? "expirada" : "ativa"}
                </span>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}