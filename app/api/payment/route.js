import { redirect } from "next/navigation";

import { NextResponse } from 'next/server';

export async function POST(request) {
  const origin = request.headers.get('origin');

  if (origin === 'https://secure.wayforpay.com') {
    const body = await request.json();

    if (body.status === 'Approved') {

      console.log('Payment Approved:', body);
    }

    const response = NextResponse.json({ status: 'success' });
    response.headers.set('Access-Control-Allow-Origin', 'https://secure.wayforpay.com');
    response.headers.set('Access-Control-Allow-Methods', 'POST');
    return response;
  }

  return NextResponse.json({ status: 'error', message: 'Unauthorized' });
}