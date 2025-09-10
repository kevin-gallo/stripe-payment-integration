'use client'

import Link from 'next/link';
import { products } from './data/data';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Loading } from './components/Loading';
import { ProductCard } from './components/ProductCard';

export default function Home() {
  const [cart, setCart] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (productId: number) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    if(!existingCart.includes(productId)) {
      const updatedCart = [...existingCart, productId];
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      setCart(updatedCart);
    }
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cart);
    setLoading(false);
  }, []);

  if(loading) {
    return <Loading />;
  }

  return (
    <div className='px-12'>
      <div className='flex items-center justify-between gap-2'>
        <h1 className='text-5xl font-semibold text-center my-6'>Products</h1>
        <div>
          <Link href="/checkout" className="relative inline-block">
            <ShoppingCart className="mx-auto" size={32} />
            
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full py-[2px] px-[6px]">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {(products.length !== 0 && products) ? (
          <ProductCard 
            products={products} 
            cart={cart}
            handleAddToCart={handleAddToCart}
          />
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
