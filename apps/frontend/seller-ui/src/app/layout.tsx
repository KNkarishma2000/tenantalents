import './global.css';
import {Poppins} from 'next/font/google';
import Providers from './Provider';

export const metadata = {
  title: 'Tentalents Seller',
  description: 'Tentalents MarkerPlace | A one stop solution',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-white font-sans antiaiased ${poppins.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
