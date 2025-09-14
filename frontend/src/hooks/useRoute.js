import { useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function useRoute() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function findRoute(src, dst, mode='stops') {
    setLoading(true); setError('')
    try {
      const url = `${API_BASE}/route?src=${encodeURIComponent(src)}&dst=${encodeURIComponent(dst)}&mode=${encodeURIComponent(mode)}`
      const res = await fetch(url)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Route error')
      setData(json)
    } catch (e) {
      setError(e.message || 'Route error')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, findRoute }
}