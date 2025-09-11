'use client'

import Image from "next/image"
import { ProductCardProps } from "../types/types"

export const ProductCard: React.FC<ProductCardProps> = ({ products, cart, handleAddToCart }) => {
    console.log('cart in ProductCard:', cart);
    return (
        <>
            {
                products.length !== 0 && products.map((product) => (
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
            }
        </>
    )
}