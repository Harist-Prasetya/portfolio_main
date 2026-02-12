import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import CyberBackground from './components/CyberBackground'

import Home from './pages/Home'
import Works from './pages/Works'
import Services from './pages/Services'
import About from './pages/About'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  )
}


function App() {
  useEffect(() => {
    const cursor = document.querySelector('.laser-cursor')
    const glow = document.querySelector('.laser-glow')

    let x = 0, y = 0
    let tx = 0, ty = 0
    let gx = 0, gy = 0

    const spawnParticle = (x, y) => {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.left = `${x}px`
      p.style.top = `${y}px`
      document.body.appendChild(p)
      setTimeout(() => p.remove(), 600)
    }

    window.addEventListener('mousemove', e => {
      tx = e.clientX
      ty = e.clientY

      spawnParticle(tx, ty)

      const target = document.elementFromPoint(tx, ty)
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON')) {
        const rect = target.getBoundingClientRect()
        x = rect.left + rect.width / 2
        y = rect.top + rect.height / 2
      } else {
        x = tx
        y = ty
      }
    })

    const animate = () => {
      gx += (x - gx) * 0.12
      gy += (y - gy) * 0.12

      cursor.style.transform = `translate(${x}px, ${y}px)`
      glow.style.transform = `translate(${gx}px, ${gy}px)`

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  useEffect(() => {
    const cursor = document.querySelector('.laser-cursor')
    const glow = document.querySelector('.laser-glow')

    let x = 0, y = 0
    let tx = 0, ty = 0
    let gx = 0, gy = 0

    const spawnParticle = (x, y) => {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.left = `${x}px`
      p.style.top = `${y}px`
      document.body.appendChild(p)
      setTimeout(() => p.remove(), 600)
    }

    window.addEventListener('mousemove', e => {
      tx = e.clientX
      ty = e.clientY

      spawnParticle(tx, ty)

      const target = document.elementFromPoint(tx, ty)
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON')) {
        const rect = target.getBoundingClientRect()
        x = rect.left + rect.width / 2
        y = rect.top + rect.height / 2
      } else {
        x = tx
        y = ty
      }
    })

    const animate = () => {
      gx += (x - gx) * 0.12
      gy += (y - gy) * 0.12

      if(cursor && glow) { // Safety check
          cursor.style.transform = `translate(${x}px, ${y}px)`
          glow.style.transform = `translate(${gx}px, ${gy}px)`
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <BrowserRouter>
      {/* cursor */}
      <div className="laser-cursor"></div>
      <div className="laser-glow"></div>

      {/* lava background */}
      <CyberBackground />

      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
