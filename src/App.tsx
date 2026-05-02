import ShortenSection from "./components/ShortenSection"
import StatsSection from "./components/StatsSection"
import Divider from "./components/Divider"

function App() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0e]">
      <div className="w-full max-w-xl bg-[#1a1917] border border-[#2e2d2a]/60 rounded-2xl px-10 py-8">

        <h1 className="text-[#e8e6e0] text-2xl font-semibold mb-1">Encurtador de URL</h1>
        <p className="text-[#6b6a65] text-sm mb-8">Cole algum link longo e obtenha um curto na hora!</p>

        <ShortenSection/>
        <Divider/>
        <StatsSection/>
        
      </div>
    </div>
  )
}

export default App