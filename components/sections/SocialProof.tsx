'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function SocialProof() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-12 bg-white/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-700 font-medium ml-2">Trusted by 10,000+ Parents</span>
          </div>
          <div className="flex items-center gap-6 text-gray-500">
            <span className="text-sm">Featured in:</span>
            <div className="flex gap-4">
              <span className="text-xs font-semibold">PARENTING</span>
              <span className="text-xs font-semibold">BABY MAG</span>
              <span className="text-xs font-semibold">MOM & BABY</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

