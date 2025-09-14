export default function StationPicker({ label, value, onChange, stations = [], loading }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <select
        className="w-full px-4 py-3 rounded-xl bg-[#0b1220] border border-gray-700 text-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        {stations.map(s => (
          <option key={s.code} value={s.code}>
            {s.name} ({s.code})
          </option>
        ))}
      </select>
    </div>
  )
}