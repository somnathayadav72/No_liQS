'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const comparisonData = [
  ['10-Hour All-Night Protection', true, false],
  ['Bubble Technology', true, false],
  ['3-Layer Leakage Protection', true, false],
  ['360° Soft Fit Waistband', true, false],
  ['Wetness Indicator', true, false],
  ['Anti-Rash Protection', true, false],
  ['Non-Woven Breathable Material', true, 'partial'],
]

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/30 laser-container">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
            NoliQS vs. Regular Diapers
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            See why thousands of parents make the switch
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-3xl p-8 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-heading text-lg">Feature</th>
                <th className="text-center py-4 px-4 font-heading text-lg text-soft-blue-600">NoliQS</th>
                <th className="text-center py-4 px-4 font-heading text-lg text-gray-500">Regular Diapers</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map(([feature, noliqs, regular], idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium">{feature as string}</td>
                  <td className="py-4 px-4 text-center">
                    {noliqs ? (
                      <Check className="w-6 h-6 text-soft-blue-600 mx-auto" />
                    ) : (
                      <X className="w-6 h-6 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {regular === true ? (
                      <Check className="w-6 h-6 text-gray-500 mx-auto" />
                    ) : regular === 'partial' ? (
                      <span className="text-gray-500">~</span>
                    ) : (
                      <X className="w-6 h-6 text-gray-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

