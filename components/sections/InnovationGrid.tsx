'use client'

import { motion } from 'framer-motion'
import { Droplet, Shield, Zap, Leaf } from 'lucide-react'

const features = [
  {
    icon: Droplet,
    title: 'High Absorbent',
    description: '+30% high absorbency technology',
    highlight: '7 Glasses (350ml) Capacity',
    bgColor: 'bg-baby-blue',
    iconColor: 'text-soft-blue-600',
    glowColor: 'bg-soft-blue-200'
  },
  {
    icon: Shield,
    title: '10 Hour Protection',
    description: 'All-night protection for uninterrupted sleep',
    highlight: '3-Layer Leakage Protection',
    bgColor: 'bg-soft-blue',
    iconColor: 'text-soft-blue-600',
    glowColor: 'bg-coral-200'
  },
  {
    icon: Zap,
    title: '360° Soft Fit Waistband',
    description: 'Comfortable fit that moves with your baby',
    highlight: 'Comfort Fit Design',
    bgColor: 'bg-coral-100',
    iconColor: 'text-coral-600',
    glowColor: 'bg-baby-blue-200'
  },
  {
    icon: Leaf,
    title: 'Anti-Rash Protection',
    description: 'Non-woven soft and breathable material',
    highlight: 'Cotton Soft Layers',
    bgColor: 'bg-baby-blue',
    iconColor: 'text-soft-blue-600',
    glowColor: 'bg-baby-blue-200'
  }
]

export default function InnovationGrid() {
  return (
    <section id="science" className="py-32 px-4 sm:px-6 lg:px-8 laser-container">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
            Innovation That Cares
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Every feature designed with your baby's comfort and your peace of mind
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="glassmorphism rounded-3xl p-8 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.glowColor} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 relative z-10`}>
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 mb-3 text-lg">
                  {feature.description}
                </p>
                <div className="text-base text-soft-blue-600 font-bold">
                  {feature.highlight}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

