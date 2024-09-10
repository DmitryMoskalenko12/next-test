'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { redirect } from 'next/navigation';
import video from '@/video/bgVideo.mp4';

export default function VideoPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const searchParams = useSearchParams();
  const orderReference = searchParams.get('orderReference');

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const res = await fetch('/api/payment-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderReference }),
        });

        const data = await res.json();

        if (data.success) {
          setHasAccess(true);
        } else {
          redirect('/');
        }
      } catch (error) {
        console.error('Payment check failed', error);
        redirect('/')
      }
    };

    if (orderReference) {
      checkPayment();
    }
  }, [orderReference, router]);

  return (
    <div>
      {hasAccess ? (
        <video controls src={video} />
      ) : (
        <p>Checking payment status...</p>
      )}
    </div>
  );
}