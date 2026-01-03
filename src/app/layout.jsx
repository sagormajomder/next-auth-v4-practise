import Navbar from '@/components/Navbar';
import NextAuthProvider from '@/providers/NextAuthProvider';
import { Poppins } from 'next/font/google';
import './globals.css';
const poppins = Poppins({
  weight: ['200', '400', '500', '600', '700'],
});

const RootLayout = ({ children }) => {
  return (
    <NextAuthProvider>
      <html className={`${poppins.className}`}>
        <body className=''>
          <Navbar />
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
};
export default RootLayout;
