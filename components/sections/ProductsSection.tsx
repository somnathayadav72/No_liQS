'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useProducts } from '@/lib/hooks/useProducts'
import productsData from '@/app/products.json'
import { Product, FilterType } from '@/types'

interface ProductsSectionProps {
  initialFilter?: FilterType
}

const sizeLabels: { [key: string]: string } = {
  'S': 'Small (4-8 kg)',
  'M': 'Medium (6-11 kg)',
  'L': 'Large (9-14 kg)',
  'XL': 'Extra Large (12-18 kg)',
  'Mixed': 'Mixed Sizes'
}

export default function ProductsSection({ initialFilter }: ProductsSectionProps) {
  const {
    selectedSize,
    setSelectedSize,
    selectedType,
    setSelectedType,
    displayedProducts,
    hasMore,
    isLoading,
    expandedProducts,
    setExpandedProducts,
    handleLoadMore,
    handleFilterChange,
    resetFilters
  } = useProducts(productsData as Product[])

  useEffect(() => {
    if (initialFilter) {
      if (initialFilter === 'all') {
        resetFilters()
      } else {
        setSelectedType(initialFilter)
        handleFilterChange()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilter])

  return (
    <section id="products" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-blue-50 to-off-white laser-container">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
            Shop NoliQS Products
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Choose from our range of premium baby diapers
          </p>
        </motion.div>

        {/* Filters - Sticky */}
        <div className="sticky top-[80px] md:top-20 z-40 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 justify-center glassmorphism rounded-3xl p-4 backdrop-blur-md"
          >
            {/* Size Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-700 self-center">Size:</span>
              {['All', 'S', 'M', 'L', 'XL'].map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedSize(size === 'All' ? null : size)
                    handleFilterChange()
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSize === (size === 'All' ? null : size)
                      ? 'bg-soft-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-baby-blue-100 border border-gray-200'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-700 self-center">Type:</span>
              {['All', 'diaper', 'pant'].map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedType(type === 'All' ? null : type)
                    handleFilterChange()
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === (type === 'All' ? null : type)
                      ? 'bg-coral-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-baby-blue-100 border border-gray-200'
                  }`}
                >
                  {type === 'All' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product, idx) => {
            const isExpanded = expandedProducts.has(idx)
            const isPremium = product.features.some((f: string) => 
              f.toLowerCase().includes('premium')
            )

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glassmorphism rounded-3xl p-6 hover:shadow-2xl transition-all cursor-pointer group relative flex flex-col h-full"
              >
                {/* Product Badge */}
                {isPremium && (
                  <div className="absolute top-4 right-4 bg-coral-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                    Premium
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-48 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-soft-blue-200 to-soft-blue-300">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={`NoliQS ${product.diaperType === 'pant' ? 'Pant' : 'Diaper'} ${product.size} - ${product.pcs} Pcs`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex items-center justify-center drop-shadow-lg"
                      >
                        <svg 
                          className="w-28 h-28 text-white" 
                          viewBox="0 0 100 100" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
                        >
                          <path 
                            d="M 30 20 Q 20 20 20 30 L 20 70 Q 20 80 30 80 L 50 80 L 50 75 Q 50 70 55 70 L 70 70 Q 75 70 75 65 L 75 35 Q 75 30 70 30 L 55 30 Q 50 30 50 25 L 50 20 Z" 
                            fill="white" 
                            opacity="0.9"
                            stroke="white" 
                            strokeWidth="3"
                          />
                          <ellipse cx="50" cy="30" rx="20" ry="5" fill="white" opacity="0.95"/>
                          <ellipse cx="35" cy="50" rx="8" ry="12" fill="white" opacity="0.85"/>
                          <ellipse cx="65" cy="50" rx="8" ry="12" fill="white" opacity="0.85"/>
                          <ellipse cx="50" cy="55" rx="15" ry="20" fill="white" opacity="0.7"/>
                        </svg>
                      </motion.div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                        NoliQS {product.diaperType === 'pant' ? 'Pant' : 'Diaper'}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-soft-blue-600">{product.size}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-700">{sizeLabels[product.size] || product.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold">{product.pcs} Pcs</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 pb-4">
                      <div className="flex flex-wrap gap-2">
                        {(isExpanded ? product.features : product.features.slice(0, 2)).map((feature: string, i: number) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="text-xs px-2 py-1 rounded-full bg-baby-blue-100 text-soft-blue-700 font-medium"
                          >
                            {feature}
                          </motion.span>
                        ))}
                        {product.features.length > 2 && !isExpanded && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setExpandedProducts(prev => new Set(prev).add(idx))
                            }}
                            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-soft-blue-100 hover:text-soft-blue-600 transition-colors cursor-pointer"
                          >
                            +{product.features.length - 2} more
                          </motion.button>
                        )}
                        {product.features.length > 2 && isExpanded && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setExpandedProducts(prev => {
                                const newSet = new Set(prev)
                                newSet.delete(idx)
                                return newSet
                              })
                            }}
                            className="text-xs px-2 py-1 rounded-full bg-soft-blue-100 text-soft-blue-600 font-medium hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                          >
                            Show less
                          </motion.button>
                        )}
                        {product.features.length === 0 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                            Premium Quality
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <motion.a
                    href={product.typeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full pill-button bg-coral-500 text-white text-center hover:bg-coral-600 mt-6"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    style={{ marginTop: 'auto' }}
                  >
                    Buy Now on Meesho
                  </motion.a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={handleLoadMore}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pill-button bg-soft-blue-600 text-white text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Loading...
                </span>
              ) : (
                'Load More Products'
              )}
            </motion.button>
          </motion.div>
        )}

        {/* No Results Message */}
        {displayedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No products found with selected filters.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedSize(null)
                setSelectedType(null)
              }}
              className="mt-4 px-6 py-2 rounded-full bg-soft-blue-600 text-white"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

