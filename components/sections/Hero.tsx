'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { scrollToSection, scrollToProducts } from '@/utils/scroll'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function Hero() {
  return (
    <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50" style={{ marginTop: 0, minHeight: '90vh' }}>
      {/* Static Gradient Background - Optimized */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30" />
      
      {/* Simplified Floating Orbs - Static with subtle animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Enhanced */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="space-y-8 lg:pr-8"
          >
            <motion.div variants={staggerItem} className="inline-block">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-coral-400 to-pink-400 text-white text-sm font-bold shadow-lg backdrop-blur-sm"
              >
                ✨ Premium Baby Diaper Pants
              </motion.span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-[1.1] tracking-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="block text-gray-900"
              >
                Comfy on Your
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="block gradient-text mt-2"
              >
                Skin, Baby
              </motion.span>
            </motion.h1>
            
            <motion.p
              variants={staggerItem}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              10-hour all-night protection with <span className="font-bold gradient-text">Bubble Technology</span> & 3-layer leakage protection. 
              <br className="hidden sm:block" />
              <span className="text-lg md:text-xl text-gray-600 block mt-2">+30% High Absorbency • 7 Glasses (350ml) Capacity</span>
            </motion.p>

            {/* Product Info Pills - Enhanced */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { label: 'Size L', value: '9-14 kg', icon: '📦' },
                { label: '50 Pcs', value: 'Per Pack', icon: '✨' },
                { label: '10 Hours', value: 'Protection', icon: '🛡️' }
              ].map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glassmorphism rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg backdrop-blur-xl border border-white/50"
                >
                  <span className="text-2xl">{info.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">{info.label}</span>
                    <span className="text-xs text-gray-600">{info.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-5 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToProducts}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-coral-500 to-pink-500 text-white text-lg font-bold shadow-2xl hover:shadow-coral-500/50 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now →
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-coral-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('comparison')}
                className="px-8 py-4 rounded-2xl bg-white/90 backdrop-blur-md text-gray-800 text-lg font-bold border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 shadow-lg transition-all duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image - 3D Floating Card - Optimized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative h-[550px] lg:h-[700px]"
          >
            {/* 3D Card Container - Simplified */}
            <motion.div
              className="card-3d relative h-full w-full"
              whileHover={{ 
                scale: 1.02
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50">
                <Image
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80"
                  alt="Happy baby with NoliQS premium diaper"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Floating Badge - Simplified */}
                <div className="absolute top-8 right-8 glassmorphism rounded-2xl px-5 py-3 flex items-center gap-3 z-10 shadow-xl backdrop-blur-xl">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-900">Premium</span>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-white/50">
                    <p className="text-gray-900 font-bold text-base drop-shadow-sm">Trusted by 10,000+ Parents</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Static Glow Effect Behind Card */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400/20 via-pink-400/20 to-purple-400/20 rounded-[2.5rem] blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

