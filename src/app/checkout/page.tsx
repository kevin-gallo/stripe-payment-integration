'use client'

import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { products } from '../data/data';

const Checkout = () => {

    const [cartProducts, setCartProducts] = useState<typeof products>([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

        if(storedCart.length !== 0) {
            const filteredProducts = products.filter((product) => 
                storedCart.includes(product.id)
            );

            setCartProducts(filteredProducts);
        }
    }, []);

    console.log(cartProducts);

    return (
        <div>
            <div className='flex items-center justify-center'>
                <div>
                    <Link href="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-300">
                        <Home size={32} />
                    </Link> 
                </div>
                <h1 className='text-5xl font-semibold text-center my-6'>Checkout</h1>
            </div>
            <div className='flex items-center justify-center'>
                {
                    cartProducts.length !== 0  ? ( 
                        <div className='flex items-start justify-center gap-10'>
                            <div>
                                {
                                    cartProducts.length !== 0 ? (
                                        cartProducts.map((product) => (
                                            <div key={product.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                                                <div className="md:flex">
                                                <div className="md:flex-shrink-0">
                                                    <img src={product.image} alt={product.name} className="h-48 w-full object-cover md:h-full md:w-48" />
                                                </div>
                                                <div className="p-8">
                                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.company}</div>
                                                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{product.name}</h1>
                                                    <p className="mt-2 text-gray-500">{product.description}</p>
                                                    <p className="mt-2 text-gray-900 font-bold">${product.price}</p>
                                                </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        ''
                                    )
                                }
                            </div>
                            <div className='p-6 border border-gray-300 rounded'>
                                <h2 className='text-2xl mb-2 font-semibold'>Review your cart</h2>
                                <p>Sub-total: ${cartProducts.reduce((total, product) => total + product.price, 0)}</p>
                                <p>Quantity: {cartProducts.length}</p>
                                <p>Discount: 0</p>
                                <p className='text-3xl font-bold'>
                                    ${cartProducts.reduce((total, product) => total + product.price, 0)}
                                </p>
                                <button className='mt-4 text-white px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600'>Pay Now</button>
                            </div>
                        </div>
                    ) : (
                        <p className='text-center text-2xl'>No items in the cart</p>
                    )
                }
            </div>
        </div>
    )
}

export default Checkout;