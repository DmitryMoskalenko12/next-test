import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

export async function POST(request) {
  const { orderReference } = await request.json();
  
  const merchantAccount = 'test_com_a8e65';
  const merchantSecretKey = '02ecb667df45a90f2415a68c3f3203912ec2169d';
  
  // Генерация подписи для запроса
  const signature = generateSignature(orderReference, merchantAccount, merchantSecretKey);
  
  const requestData = {
    transactionType: 'CHECK_STATUS',
    merchantAccount,
    orderReference,
    apiVersion: 1,
    merchantSignature: signature,
  };

  try {
    const response = await axios.post('https://api.wayforpay.com/api', requestData);
    
    const { transactionStatus } = response.data;
    
    if (transactionStatus === 'Approved') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Payment not approved' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Payment check failed' });
  }
}

// Функция генерации подписи для WayForPay
function generateSignature(orderReference, merchantAccount, merchantSecretKey) {
  const signatureData = [merchantAccount, orderReference].join(';');
  return crypto.createHash('md5').update(signatureData + merchantSecretKey).digest('hex');
}