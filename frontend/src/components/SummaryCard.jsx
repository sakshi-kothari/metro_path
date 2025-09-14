export default function SummaryCard({ loading, route, mode }) {
  const modeLabel = mode === 'time' ? 'Fastest (time)' : 'Fewest Stops'
  return (
    <div className="p-5 rounded-xl border border-gray-700 bg-[#101826] shadow-xl">
      <h3 className="font-semibold text-blue-300">Summary</h3>
      {loading && <p className="text-sm text-gray-400 mt-2">Computing route…</p>}
      {!loading && route && (
        <div className="space-y-1 mt-2 text-sm">
          <div><span className="text-gray-400">Mode:</span> {modeLabel}</div>
          <div><span className="text-gray-400">Stops:</span> {route.stops}</div>
          <div><span className="text-gray-400">Approx. Time:</span> {route.totalTime} min</div>
          <div><span className="text-gray-400">Estimated Fare:</span> ₹{route.fare}</div>
        </div>
      )}
      {!loading && !route && (
        <p className="text-sm text-gray-400 mt-2">Run a search to see details.</p>
      )}
    </div>
  )
}