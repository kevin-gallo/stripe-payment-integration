'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loading } from '../components/Loading';
import { ArrowLeft } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  console.log('sessionId', sessionId);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if(sessionId) {
      const fetchSession = async () => {
        const res = await fetch(`/api/get_checkout_session?session_id=${sessionId}`);
        console.log('get res', res);
        const data = await res.json();
        setSession(data);
      };

      fetchSession();
    }

    localStorage.removeItem('cart');
  }, [sessionId]);

  if(!session) {
    <Loading />;
  }

  console.log('session', session);

  return (
    <div className='flex items-center justify-center gap-4 mt-6'>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-indigo-500 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700">Thank you for your purchase.</p>
        <Link
          href={"/"}
          className="flex gap-2 mt-6 bg-white text-indigo-500 px-4 py-2 rounded border border-indigo-500"
        >
          <ArrowLeft /> Back to Home
        </Link>
      </div>
      <div>
        {
          session ? (
            <div className='p-6 border-l border-gray-300'>
              <h1 className='text-2xl font-semibold mb-2'>Receipt</h1>
              <p><strong>Name:</strong> {session.customer_details.name}</p>
              <p><strong>Email:</strong> {session.customer_details.email}</p>
              <p><strong>Address:</strong> {session.customer_details.address.country}</p>
              <p><strong>Amount Total:</strong> {session.amount_total}</p>
              <p><strong>Created:</strong> {session.created}</p>
              <p><strong>Currency:</strong> {session.currency}</p>
              <button className='mt-4 text-white px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600'>Download Receipt</button>
            </div>
          ) : (
            ''
          )
        }
      </div>
    </div>
  );
}
