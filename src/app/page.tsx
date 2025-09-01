'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products } from './data/data';


export default function Home() {
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const selectedProducts = [];

  return (
    <div className='px-12'>
      <h1 className='text-5xl font-semibold text-center my-6'>Products</h1>
      <div className='grid grid-cols-2 gap-2'>
        {(products.length !== 0 && products) ? (
          products.map((product) => (
            <div key={product.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image src={product.image} alt={product.name} width={192} height={192} className="h-48 w-full object-cover md:h-full md:w-48" />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.company}</div>
                  <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{product.name}</h1>
                  <p className="mt-2 text-gray-500">{product.description}</p>
                  <p className="mt-2 text-gray-900 font-bold">${product.price}</p>
                  <Link href={`/checkout?productName=${encodeURIComponent(product.name)}&amount=${encodeURIComponent(product.price)}`}>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Add to Cart
                    </button>
                  </Link>
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
