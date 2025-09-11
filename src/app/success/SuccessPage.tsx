'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loading } from '../components/Loading';
import { Home, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import Stripe from 'stripe';

export default function SuccessPageComponent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  console.log('sessionId', sessionId);
  const [session, setSession] = useState<Stripe.Checkout.Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchSession = async () => {
        if(!sessionId) return;

        try {
          const res = await fetch(`/api/get_checkout_session?session_id=${sessionId}`);
          const data = await res.json();

          if(res.ok) {
            setSession(data);
          } else {
            console.log('Error fetching session:', data.error);
          }

        } catch (error) {
          console.log('error', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSession();
      localStorage.removeItem('cart');
  }, [sessionId]);

  const handleDownloadReceipt = () => {
    if (!session) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Payment Receipt', 14, 22);
    doc.setFontSize(12);
    doc.text(`Name: ${session.customer_details?.name || 'N/A'}`, 20, 40);
    doc.text(`Email: ${session.customer_details?.email || 'N/A'}`, 20, 50);
    doc.text(`Country: ${session.customer_details?.address?.country || 'N/A'}`, 20, 60);
    doc.text(`Amount Total: $${((session.amount_total ?? 0) / 100).toFixed(2)}`, 20, 70);
    doc.text(`Currency: ${session.currency?.toUpperCase()}`, 20, 80);
    doc.text(`Created: ${new Date(session.created * 1000).toLocaleString()}`, 20, 90);

    doc.save(`receipt_${new Date(session.created * 1000).toLocaleString()}.pdf`);
  }

  if(loading) {
    return <Loading />;
  }

  if (!session) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500">Unable to retrieve session details.</p>
        <Link href="/" className="text-indigo-500 underline mt-4 block">Back to home</Link>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center gap-4 mt-6'>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-indigo-500 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700">Thank you for your purchase.</p>
        <Link
          href={"/"}
          className="flex gap-2 mt-6 bg-white text-indigo-500 px-4 py-2 rounded border border-indigo-500 hover:bg-gray-100"
        >
          <Home /> Back to Home
        </Link>
      </div>
      <div>
        {
          session ? (
            <div className='p-6 border-l border-gray-300'>
              <h1 className='text-4xl font-semibold mb-2'>Receipt</h1>
              <p><strong>Name:</strong> {session.customer_details?.name ?? 'NA'}</p>
              <p><strong>Email:</strong> {session.customer_details?.email ?? 'NA'}</p>
              <p><strong>Address:</strong> {session.customer_details?.address?.country ?? 'NA'}</p>
              <p><strong>Amount Total:</strong> ${session.amount_total ?? 'NA'}</p>
              <p><strong>Created:</strong> {new Date(session?.created * 1000).toLocaleString() ?? 'NA'}</p>
              <p><strong>Currency:</strong> {session?.currency}</p>
              <button
                onClick={handleDownloadReceipt} 
                className='flex gap-2 mt-4 text-white px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600'
              >
                <Download />
                Download Receipt
                </button>
            </div>
          ) : (
            ''
          )
        }
      </div>
    </div>
  );
}
