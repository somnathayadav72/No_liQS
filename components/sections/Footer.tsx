'use client'

import Image from 'next/image'
import { scrollToSection } from '@/utils/scroll'
import { FilterType } from '@/types'

interface FooterProps {
  onProductFilter: (filterType: FilterType) => void
}

export default function Footer({ onProductFilter }: FooterProps) {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Image
              src="/images/logo.jpg"
              alt="NoliQS Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-gray-700 text-sm">
              Premium baby care products designed with love and science.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Products</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <button 
                  onClick={() => onProductFilter('diaper')}
                  className="hover:text-soft-blue-600 transition-colors text-left"
                >
                  Diapers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onProductFilter('pant')}
                  className="hover:text-soft-blue-600 transition-colors text-left"
                >
                  Pants
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onProductFilter('all')}
                  className="hover:text-soft-blue-600 transition-colors text-left"
                >
                  Bundles
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Company</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <button onClick={() => scrollToSection('science')} className="hover:text-soft-blue-600 transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('science')} className="hover:text-soft-blue-600 transition-colors text-left">
                  Our Science
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-soft-blue-600 transition-colors text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-700">
          <p>&copy; 2024 NoliQS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

