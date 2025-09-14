import { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function useGraph() {
  const [stationsMap, setStationsMap] = useState({})
  const [stationList, setStationList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true); setError('')
      try {
        const res = await fetch(`${API_BASE}/graph`)
        const data = await res.json()
        const stations = data.stations || {}
        setStationsMap(stations)
        const list = Object.entries(stations).map(([code, info]) => ({ code, name: info.name }))
          .sort((a,b) => a.name.localeCompare(b.name))
        setStationList(list)
      } catch (e) {
        setError(e.message || 'Graph load error')
      } finally {
        setLoading(false)
      }
    }
    fetchGraph()
  }, [])

  return { stationsMap, stationList, loading, error }
}