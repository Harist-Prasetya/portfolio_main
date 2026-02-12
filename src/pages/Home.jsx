import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import SystemBreach from '../components/SystemBreach' // Import Game
import AbyssalNexus from '../components/AbyssalNexus' // Import Majestic Section
import '../styles/sections.css' // Import the new CSS

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Original Hero */}
      <Hero />

      {/* 2. The Interactive Minigame */}
      <SystemBreach />

      {/* 3. The Majestic Web/Ocean Bridge */}
      <AbyssalNexus />
      
    </motion.div>
  )
}