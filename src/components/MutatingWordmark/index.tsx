'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const treatments = [
  { className: 'font-display tracking-tight', style: { fontWeight: 900 } },
  { className: 'font-display tracking-[0.15em] uppercase', style: { fontWeight: 400 } },
  { className: 'font-mono tracking-wider uppercase', style: { fontWeight: 500, fontSize: '0.85em' } },
  { className: 'font-display italic', style: { fontWeight: 700 } },
  { className: 'font-display tracking-[-0.05em]', style: { fontWeight: 800, letterSpacing: '-0.05em' } },
]

export const MutatingWordmark: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [index, setIndex] = useState(0)

  const cycle = useCallback(() => {
    setIndex((prev) => (prev + 1) % treatments.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(cycle, 4000)
    return () => clearInterval(interval)
  }, [cycle])

  const treatment = treatments[index]

  return (
    <a href="/" className={`inline-block no-underline text-ink ${className}`} onClick={cycle}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className={treatment.className}
          style={treatment.style}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          LABORATORIUM
        </motion.span>
      </AnimatePresence>
    </a>
  )
}
