export default function RouteChips({ path = [], stationsMap = {} }) {
  if (!path.length) return (
    <div className="text-sm text-gray-400">No route yet. Choose stations and click <strong>Find Route</strong>.</div>
  )
  return (
    <div className="hide-scrollbar overflow-x-auto scroll-snap-x snap-mandatory gap-2 flex">
      {path.map(code => {
        const name = stationsMap[code]?.name || code
        return (
          <div key={code} className="scroll-snap-center shrink-0 px-3 py-2 rounded-full bg-[#0b1220] border border-gray-700 text-sm">
            {name} <span className="text-gray-500">({code})</span>
          </div>
        )
      })}
    </div>
  )
}