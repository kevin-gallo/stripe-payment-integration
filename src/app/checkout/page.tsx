'use client'

import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { products } from '../data/data';
import { Loading } from '../components/Loading';
import { ProductCard } from '../components/ProductCard';
import { ReviewCart } from '../components/ReviewCart';

const Checkout = () => {
    const [cartProducts, setCartProducts] = useState<typeof products>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

        if(storedCart.length !== 0) {
            const filteredProducts = products.filter((product) => 
                storedCart.includes(product.id)
            );

            setCartProducts(filteredProducts);
        }

        setLoading(false);

    }, []);

    if(loading) {
        return <Loading />;
    }

    const handleCheckout = async () => {
        const res = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cartItems: cartProducts })
        })

        const data = await res.json();
        if(data.url) {
            window.location.href = data.url;
        } else {
            console.error(data.error);
        }
    }

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
            <div className='flex items-center justify-center px-10'>
                {
                    cartProducts.length !== 0  ? ( 
                        <div className='flex items-start justify-center gap-10'>
                            <div className='grid gap-4'>
                                {
                                    cartProducts.length !== 0 ? (
                                        <ProductCard 
                                            products={cartProducts} 
                                            cart={cartProducts.map(product => product.id)} 
                                            handleAddToCart={() => {}}
                                        />
                                    ) : (
                                        ''
                                    )
                                }
                            </div>
                            <ReviewCart 
                                cartProducts={cartProducts} 
                                handleCheckout={handleCheckout}
                            />
                        </div>
                    ) : (
                        <p className='text-center text-xl font-semibold text-indigo-500'>No items in the cart</p>
                    )
                }
            </div>
        </div>
    )
}

export default Checkout;