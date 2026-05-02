import { useState } from "react"
import { shortenUrl } from "../services/api"
import Spinner from "./Spinner"

export default function ShortenSection () {

    const [url, setUrl] = useState("")
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    async function handle() {
        setLoading(true)
        setError(null)
        try {
            const short = await shortenUrl(url)
            setShortenedUrl(short)
            await navigator.clipboard.writeText(short)
        } catch {
            setError("Não foi possível encurtar.")
        } finally {
            setLoading(false)
        }
    }

    return <div>
            <label className="block text-[#6b6a65] text-[11px] uppercase tracking-widest font-mono mb-2">
                URL para encurtar
            </label>
            <div className="flex gap-2">
                <input
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setShortenedUrl(null); setError(null) }}
                onKeyDown={(e) => e.key === "Enter" && handle()}
                placeholder="https://exemplo.com/link/muito/longo..."
                className="flex-1 bg-[#0f0f0e] border border-[#2e2d2a] rounded-lg px-4 py-2.5 text-sm text-[#e8e6e0] placeholder-[#3e3d39] font-mono outline-none focus:border-[#5a5652] transition-colors"
                />
                <button
                onClick={handle}
                disabled={loading || !url.trim()}
                className="w-24 flex items-center justify-center bg-[#e8e6e0] text-[#0f0f0e] rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                {loading ? <Spinner /> : "Encurtar"}
                </button>
            </div>

            {/* Área de feedback — altura fixa para não crescer */}
            <div className="h-10 mt-2 flex items-center">
                {error && (
                <p className="text-[#e24b4a] text-xs font-mono">{error}</p>
                )}
                {shortenedUrl && !error && (
                    <button
                        onClick={async () => {
                            await navigator.clipboard.writeText(shortenedUrl)
                            setCopied(true)

                            setTimeout(() => {
                                setCopied(false)
                            }, 3000)
                        }}
                        className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-between
                            gap-3
                            bg-[#1b1b1a]
                            border
                            border-[#343330]
                            rounded-lg
                            px-4
                            py-2
                            cursor-pointer
                            hover:bg-[#232321]
                            hover:border-[#4a4845]
                            transition-all
                        "
                    >
                        <span className="flex-1 text-left text-sm font-mono text-[#d8d6d0] truncate">
                            {shortenedUrl}
                        </span>

                        <span className="text-xs font-mono text-[#8a8882] whitespace-nowrap">
                            {copied ? "✓ copiado" : "clique para copiar"}
                        </span>
                    </button>
                )}
            </div>
        </div>


}