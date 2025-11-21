import { useState } from 'react'
import { Product } from '@/types'

export function useProducts(products: Product[]) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(8)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set())

  const filteredProducts = products.filter((product) => {
    if (selectedSize && product.size !== selectedSize) return false
    if (selectedType && product.diaperType !== selectedType) return false
    return true
  })

  const displayedProducts = filteredProducts.slice(0, displayCount)
  const hasMore = filteredProducts.length > displayCount

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 8)
      setIsLoading(false)
    }, 800)
  }

  const resetFilters = () => {
    setSelectedSize(null)
    setSelectedType(null)
    setDisplayCount(8)
    setExpandedProducts(new Set())
  }

  const setFilter = (type: 'diaper' | 'pant' | null) => {
    setSelectedType(type)
    handleFilterChange()
  }

  const handleFilterChange = () => {
    setDisplayCount(8)
    setExpandedProducts(new Set())
  }

  return {
    selectedSize,
    setSelectedSize,
    selectedType,
    setSelectedType,
    displayCount,
    displayedProducts,
    hasMore,
    isLoading,
    expandedProducts,
    setExpandedProducts,
    handleLoadMore,
    resetFilters,
    handleFilterChange,
    setFilter
  }
}

