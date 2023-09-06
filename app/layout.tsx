import './globals.css';
import type {Metadata} from 'next';
import Footer from '@/components/footer/Footer';
import ThemeProvider from '@/components/contexts/ThemeContext';

export const metadata: Metadata = {
  title: 'Crop Map',
  description: 'Displays crop data for locations selected on a map',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='py-2 px-3'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <main className='min-h-screen min-w-full'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
