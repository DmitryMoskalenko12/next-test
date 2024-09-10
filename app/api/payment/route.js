import { redirect } from "next/navigation";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
  
      // Проверка статуса платежа
      if (data.status === 'Approved') {
         redirect('/success')
        // Можно обновить статус заказа в базе данных
      } else {
      
      }
  
      // Ответ WayForPay
      res.status(200).json({ status: 'success' });
    } else {
      // Если метод не POST
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }