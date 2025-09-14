
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import StationPicker from '../components/StationPicker'
import ModeToggle from '../components/ModeToggle'
import SummaryCard from '../components/SummaryCard'
import RouteChips from '../components/RouteChips'
import Timeline from '../components/Timeline'
import useGraph from '../hooks/useGraph.js'
import useRoute from '../hooks/useRoute.js'

export default function App() {
  const { stationsMap, stationList, loading: graphLoading, error: graphError } = useGraph()
  const [src, setSrc] = useState('BYPL')
  const [dst, setDst] = useState('MJSK')
  const [mode, setMode] = useState('time') // 'stops' | 'time'
  const resultRef = useRef(null)

  const { data: route, loading: routeLoading, error: routeError, findRoute } = useRoute()

  const onFind = async () => {
    await findRoute(src, dst, mode)
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-4 md:px-6">
        <section className="min-h-[60vh] flex items-center">
          <div className="w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
            >
              Bengaluru Metro — Shortest Path
            </motion.h1>
            <p className="mt-3 text-gray-400 max-w-2xl">
              Pick your source & destination, choose a cost mode, and get the fastest or fewest-stop route.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <StationPicker label="Source" value={src} onChange={setSrc} stations={stationList} loading={graphLoading} />
              <StationPicker label="Destination" value={dst} onChange={setDst} stations={stationList} loading={graphLoading} />
              <ModeToggle mode={mode} setMode={setMode} />
            </div>

            <div className="mt-6">
              <button
                className="px-5 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:brightness-110 transition disabled:opacity-50"
                onClick={onFind}
                disabled={graphLoading || src === dst}
              >
                {routeLoading ? 'Finding…' : 'Find Route'}
              </button>
            </div>

            {graphError && <p className="text-red-400 mt-2">Failed to load stations: {graphError}</p>}
          </div>
        </section>

        <section ref={resultRef} className="py-10 md:py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-blue-300 mb-2">Route</h2>
              <RouteChips path={route?.path || []} stationsMap={stationsMap} />
              <div className="mt-6">
                <Timeline path={route?.path || []} stationsMap={stationsMap} />
              </div>
              {routeError && <p className="text-red-400 mt-3">Error: {routeError}</p>}
            </div>
            <div className="md:col-span-1 md:sticky md:top-6 h-fit">
              <SummaryCard loading={routeLoading} route={route} mode={mode} />
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        API base: <code>{import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'}</code>
      </footer>
    </div>
  )
}
