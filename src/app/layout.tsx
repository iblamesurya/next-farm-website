import type { Metadata } from 'next';
import Script from 'next/script';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { getVeterinaryBusinessJsonLd, getFaqPageJsonLd } from '@/lib/structured-data';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next Farm Bio Sciences | High-Potency Aquaculture Biotechnology',
  description:
    'Commercial aquaculture biotechnology enterprise in New Autonagar, Vijayawada. Formulating 11 targeted biological water treatments, benthic soil conditioners, and gut probiotics. CAA Approved, ISO 9001:2015, 100% Antibiotic-Free.',
  keywords: [
    'Next Farm Bio Sciences',
    'Aquaculture Probiotics India',
    'Shrimp Farming Vijayawada',
    'Prawn Farming Andhra Pradesh',
    'CAA Approved Probiotics',
    'White Gut Treatment Shrimp',
    'Vibrio Control Aquaculture',
    'Ammonia Remover Pond'
  ],
  authors: [{ name: 'Next Farm Bio Sciences' }],
  metadataBase: new URL('https://nextfarm.in'),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getVeterinaryBusinessJsonLd())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getFaqPageJsonLd())
          }}
        />
      </head>
      <body className="font-body text-[#1A1F24] bg-[#F4F7F8] min-h-screen flex flex-col antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
