
import { logout } from '@/actions/auth-actions';
import '../globals.css';
import Payment from '@/components/payment';

export default function AuthRootLayout({ children }) {
  return (
    <>

        <header id='auth-header'>
            <p>Welcome</p>
            <Payment/>
            <form action={logout}>
                <button>Logout</button>
            </form>
        </header>
        {children}
   
    </>
  );
}
