export default function ModeToggle({ mode, setMode }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">Cost Mode</label>
      <div className="flex bg-[#0b1220] border border-gray-700 rounded-xl overflow-hidden">
        <button
          className={`flex-1 px-4 py-3 ${mode === 'stops' ? 'bg-blue-500 text-white' : 'text-gray-300'}`}
          onClick={() => setMode('stops')}
        >
          Fewest Stops
        </button>
        <button
          className={`flex-1 px-4 py-3 ${mode === 'time' ? 'bg-blue-500 text-white' : 'text-gray-300'}`}
          onClick={() => setMode('time')}
        >
          Fastest (time)
        </button>
      </div>
    </div>
  )
}