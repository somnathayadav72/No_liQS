'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Sarah M.', text: 'My baby sleeps through the night now! Zero leaks, zero rashes. The 10-hour protection is amazing!', rating: 5 },
  { name: 'Michael T.', text: 'Best diapers we\'ve tried. The Bubble Technology really works - no leaks at all!', rating: 5 },
  { name: 'Emily R.', text: 'So soft and gentle. The non-woven material is perfect for my sensitive baby.', rating: 5 },
  { name: 'David L.', text: 'The 3-layer protection is incredible. Worth every penny!', rating: 5 },
  { name: 'Jessica K.', text: 'Love the wetness indicator and the 360° soft fit waistband. Perfect for active babies!', rating: 5 },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/30 overflow-hidden laser-container">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
            Loved by Parents Everywhere
          </h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {testimonials.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              whileHover={{ y: -10, scale: 1.05, rotate: 2 }}
              className="glassmorphism rounded-3xl p-6 min-w-[300px] flex-shrink-0 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + i * 0.05 }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-soft-blue-400 to-soft-blue-600 flex items-center justify-center text-white font-semibold"
                >
                  {review.name[0]}
                </motion.div>
                <span className="font-medium">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

