'use client'

import { ReviewCartProps } from "../types/types"

export const ReviewCart: React.FC<ReviewCartProps> = ({ cartProducts, handleCheckout }) => {
    return (
        <div className='p-6 border border-gray-300 rounded'>
            <h2 className='text-2xl mb-2 font-semibold'>Review your cart</h2>
            <p><strong>Sub-total</strong>: ${cartProducts.reduce((total, product) => total + product.price, 0)}</p>
            <p><strong>Quantity</strong>: {cartProducts.length}</p>
            <p><strong>Discount</strong>: 0</p>
            <p className='text-3xl font-bold mt-4'>
                <strong>Total</strong>: ${cartProducts.reduce((total, product) => total + product.price, 0)}
            </p>
            <button 
                onClick={handleCheckout}
                className='mt-4 text-white px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600'
            >Pay Now</button>
        </div>
    )
}