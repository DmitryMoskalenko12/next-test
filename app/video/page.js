'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default function VideoPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const [href, setHref] = useState('');

  useEffect(() => {
    const orderReference = new URL(window.location.href).searchParams.get('orderReference');
    setHref(orderReference);
  }, []);

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const res = await fetch('/api/payment-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ href }),
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

    if (href) {
      checkPayment();
    }
  }, [href]);

  return (
    <Suspense fallback={<div>Loading video...</div>}>
      {hasAccess ? (
        <video controls src="/path-to-your-video.mp4" />
      ) : (
        <p>Checking payment status...</p>
      )}
    </Suspense>
  );
}