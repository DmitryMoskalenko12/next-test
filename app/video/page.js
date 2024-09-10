'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VideoPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
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
          router.push('/');
        }
      } catch (error) {
        console.error('Payment check failed', error);
        router.push('/');
      }
    };

    if (orderReference) {
      checkPayment();
    }
  }, [orderReference, router]);

  return (
    <div>
      {hasAccess ? (
        <video controls src="/video/bgVideo.mp4" />
      ) : (
        <p>Checking payment status...</p>
      )}
    </div>
  );
}