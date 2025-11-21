'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function AbsorbencyDemo() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-coral-50 to-pink-50 relative overflow-hidden laser-container">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
            Superior Absorbency Technology
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            7 Glasses of Liquid, Where 1 Glass is Equal to 50 ML
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glassmorphism rounded-3xl p-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                💧
              </motion.div>
              <div className="text-5xl font-bold text-soft-blue-600 mb-2">350ml</div>
              <div className="text-xl text-gray-700">Total Absorption Capacity</div>
              <div className="mt-6 text-3xl font-bold text-coral-600">
                +30% HIGH ABSORBENCY
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((glass, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 glassmorphism rounded-2xl p-4"
              >
                <div className="w-12 h-12 rounded-full bg-baby-blue flex items-center justify-center text-2xl">
                  🥛
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Glass {glass}</div>
                  <div className="text-sm text-gray-600">50ml capacity</div>
                </div>
                <Check className="w-6 h-6 text-soft-blue-600" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

