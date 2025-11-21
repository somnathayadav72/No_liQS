'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const layers = [
  {
    title: 'Non-Woven Soft & Breathable Top Layer',
    description: 'Gentle, breathable material that wicks moisture away from baby\'s skin instantly. Cotton-soft layers for ultimate comfort.',
    color: 'bg-baby-blue',
    icon: '🌬️'
  },
  {
    title: 'Bubble Technology Absorption Core',
    description: 'Advanced bubble technology with +30% high absorbency. Can absorb up to 7 glasses (350ml) of liquid for superior protection.',
    color: 'bg-soft-blue',
    icon: '💧'
  },
  {
    title: '3-Layer Leakage Protection',
    description: 'Triple-layer design ensures maximum protection against leaks for up to 10 hours of all-night protection.',
    color: 'bg-coral-100',
    icon: '🛡️'
  },
  {
    title: 'Leg Cuffs & Leak-Proof Barrier',
    description: 'Advanced elastic leg cuffs prevent thigh leakage, ensuring zero leaks even during active play and all-day outings.',
    color: 'bg-baby-blue',
    icon: '✨'
  },
]

export default function ScienceOfDryness() {
  const [activeTab, setActiveTab] = useState<number | null>(null)

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 laser-container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
            The Science of Dryness
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            How our 3-layer protection system with Bubble Technology keeps your baby dry
          </p>
        </motion.div>

        <div className="space-y-4">
          {layers.map((layer, idx) => {
            const isOpen = activeTab === idx
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glassmorphism rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
                whileHover={{ scale: 1.01 }}
              >
                {/* Clickable Header */}
                <div 
                  className="flex items-center justify-between p-6"
                  onClick={() => setActiveTab(isOpen ? null : idx)}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: isOpen ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 rounded-full ${layer.color} flex items-center justify-center text-2xl flex-shrink-0`}
                    >
                      {layer.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-gray-900 group-hover:text-soft-blue-600 transition-colors">
                        {layer.title}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  </motion.div>
                </div>
                
                {/* Expandable Description */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-gray-700 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

