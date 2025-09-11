'use client';

import { useState, useEffect } from 'react';
import { products } from '../data/data';
import { ProductCard } from './ProductCard';

export const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState<number[]>([]);

  const visibleProducts = 2;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleProducts, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + visibleProducts, products.length - visibleProducts)
    );
  };

  const handleAddToCart = (productId: number) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    if(!existingCart.includes(productId)) {
      const updatedCart = [...existingCart, productId];
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      setCart(updatedCart);
    }
  };

  const currentItems = products.slice(currentIndex, currentIndex + visibleProducts);

  return (
    <div className="w-full mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">You might also like</h2>
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1 text-white bg-indigo-500 rounded disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 text-white bg-indigo-500 rounded disabled:opacity-50"
            disabled={currentIndex + visibleProducts >= products.length}
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProductCard
                products={currentItems}
                cart={cart}
                handleAddToCart={handleAddToCart}
            />
        </div>
      </div>
    </div>
  );
};
