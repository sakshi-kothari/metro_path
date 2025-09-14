export default function Timeline({ path = [], stationsMap = {} }) {
  if (!path.length) return null
  return (
    <div className="relative pl-6 before:content-[''] before:absolute before:left-2 before:top-0 before:bottom-0 before:w-[2px] before:bg-gray-700">
      {path.map((code, i) => (
        <div key={i} className="relative mb-6">
          <div className="absolute -left-[7px] w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-300"></div>
          <div className="text-base font-medium">{stationsMap[code]?.name || code}</div>
          <div className="text-xs text-gray-500">{code}</div>
        </div>
      ))}
    </div>
  )
}