import { useState } from "react"
import Spinner from "./Spinner"

export default function StatsSection () {

    const [slug, setSlug] = useState("")
    const [loadingStats, setLoadingStats] = useState(false)


    async function handleViewStats() {
        if (!slug.trim()) return
        setLoadingStats(true)
        await new Promise((r) => setTimeout(r, 1000))
        setLoadingStats(false)
    }


    return <div>
        <label className="block text-[#6b6a65] text-[11px] uppercase tracking-widest font-mono mb-2">
        Ver estatísticas
        </label>
        <div className="flex">
        <span className="bg-[#161614] border border-[#2e2d2a] border-r-0 rounded-l-lg px-3 py-2.5 text-sm text-[#3e3d39] font-mono whitespace-nowrap">
            encur.ta/
        </span>
        <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleViewStats()}
            placeholder="minha-slug"
            className="flex-1 bg-[#0f0f0e] border-y border-[#2e2d2a] px-3 py-2.5 text-sm text-[#e8e6e0] placeholder-[#3e3d39] font-mono outline-none focus:border-[#5a5652] transition-colors"
        />
        <button
            onClick={handleViewStats}
            disabled={loadingStats || !slug.trim()}
            className="w-28 flex items-center justify-center bg-transparent text-[#e8e6e0] border border-[#2e2d2a] border-l-0 rounded-r-lg px-5 py-2.5 text-sm font-['Syne'] hover:bg-[#2e2d2a] transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
        >
            {loadingStats ? <Spinner/> : "Ver stats →"}
        </button>
        </div>
    </div>
}