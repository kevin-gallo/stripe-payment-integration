'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart from localStorage
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-500 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700">Thank you for your purchase.</p>
      <button
        onClick={() => router.push('/')}
        className="mt-6 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Back to Home
      </button>
    </div>
  );
}
