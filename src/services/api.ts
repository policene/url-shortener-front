const BASE_URL = import.meta.env.API_URL;

export async function shortenUrl(url: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
  if (!res.ok) throw new Error("Erro ao encurtar")
  const data = await res.json()
  return data.short_url
}