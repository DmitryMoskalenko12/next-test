'use client'
import { logout } from '@/actions/auth-actions';
import '../globals.css';


export default function AuthRootLayout({ children }) {
    const buttonStyle = {
        display: 'inline-block',
        background: '#0488cd',
        backgroundSize: 'cover',
        width: '256px',
        height: '54px',
        border: 'none',
        borderRadius: '14px',
        padding: '18px',
        textDecoration: 'none',
        boxShadow: '3px 2px 8px rgba(71,66,66,0.22)',
        textAlign: 'center',
        outline: 'none',
      };
  return (
    <>

        <header id='auth-header'>
            <p>Welcome back!</p>
            <a
                href="https://secure.wayforpay.com/button/be4f5d57f0b97"
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.opacity = '0.8')}
                onMouseOut={(e) => (e.target.style.opacity = '1')}
                >
                <span style={{ fontFamily: 'Verdana,Arial,sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#ffffff', lineHeight: '18px', verticalAlign: 'middle' }}>
                    Оплатити
                </span>
            </a>
            <form action={logout}>
                <button>Logout</button>
            </form>
        </header>
        {children}
   
    </>
  );
}
