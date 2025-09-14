import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? 'backdrop-blur bg-black/30 py-3 shadow-lg' : 'py-5'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="font-bold tracking-tight">
          <span className="text-white">Metro</span><span className="text-blue-400">Route</span>
        </div>
        <div className="text-sm text-gray-400">Bengaluru • Demo</div>
      </div>
    </header>
  )
}