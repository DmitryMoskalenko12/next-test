import { redirect } from "next/navigation";
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
  
      // Проверка статуса платежа
      if (data.status === 'Approved') {
         
        // Можно обновить статус заказа в базе данных
      } else {
      
      }
  
      // Ответ WayForPay
      return NextResponse.json({ status: 'success' });
    } else {
      // Если метод не POST
      return NextResponse.json({ status: 'error', message: error.message });
    }
  }