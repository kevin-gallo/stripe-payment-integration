'use client'

import Image from 'next/image';
import Link from 'next/link';
import { products } from './data/data';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Loading } from './components/Loading';

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
          products.map((product) => (
            <div key={product.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image src={product.image} alt={product.name} width={192} height={192} className="h-auto w-auto object-cover md:h-full md:w-48" />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.company}</div>
                  <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{product.name}</h1>
                  <p className="mt-2 text-gray-500">{product.description}</p>
                  <p className="mt-2 text-gray-900 font-bold">${product.price}</p>
                  <button
                    className={`mt-4 text-white px-4 py-2 rounded ${
                      cart.includes(product.id)
                        ? 'bg-gray-400 !cursor-not-allowed'
                        : 'bg-indigo-500 hover:bg-indigo-600'
                    }`}
                    disabled={cart.includes(product.id)}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
