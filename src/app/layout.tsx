import type { Metadata } from 'next';
import Script from 'next/script';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { getVeterinaryBusinessJsonLd, getFaqPageJsonLd, getWebSiteJsonLd } from '@/lib/structured-data';

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
  title: 'Next Farm Bio Sciences | Aquaculture Bio-Inputs in India - Probiotics & Disease Treatments',
  description:
    'Next Farm Bio Sciences (New Autonagar, Vijayawada, Andhra Pradesh) - Manufacturer of 11 CAA-approved aquaculture biological formulations, shrimp gut probiotics, benthic soil digesters, and toxic ammonia controllers. 100% Antibiotic-Free, ISO 9001:2015.',
  keywords: [
    'Next Farm Bio Sciences',
    'NextFarm Bio Sciences',
    'Next Farm Biosciences Vijayawada',
    'Next Farm',
    'Aquaculture Probiotics India',
    'Aquaculture Bio-Inputs in India',
    'Shrimp Farming Vijayawada',
    'Prawn Farming Andhra Pradesh',
    'CAA Approved Probiotics',
    'White Gut Treatment Shrimp',
    'Vibrio Control Aquaculture',
    'Ammonia Remover Pond',
    'Next Gut',
    'Next Viro Nill',
    'Next Converter'
  ],
  authors: [{ name: 'Next Farm Bio Sciences' }],
  creator: 'Next Farm Bio Sciences',
  publisher: 'Next Farm Bio Sciences',
  metadataBase: new URL('https://nextfarmbiosciences.app'),
  alternates: {
    canonical: 'https://nextfarmbiosciences.app',
  },
  openGraph: {
    title: 'Next Farm Bio Sciences | Aquaculture Bio-Inputs in India',
    description:
      'Pioneering sustainable aquaculture biotechnology in Andhra Pradesh. 11 targeted biological water treatments, soil conditioners, and gut probiotics. CAA Approved & 100% Antibiotic-Free.',
    url: 'https://nextfarmbiosciences.app',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/branding/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Next Farm Bio Sciences Aquaculture Biotechnology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Farm Bio Sciences | Aquaculture Biotechnology',
    description: 'CAA-Approved high-potency probiotics and water treatments for shrimp and fish farming.',
    images: ['/images/branding/og_image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
        <link rel="alternate" type="text/markdown" href="/llms.txt" />
        <link rel="preconnect" href="https://checkout.razorpay.com" />
        <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: 'list',
                  urls: ['/pond-doctor', '/solutions', '/aquaculture', '/shrimp-medicine']
                }
              ],
              prefetch: [
                {
                  source: 'list',
                  urls: [
                    '/products/next-gut',
                    '/products/next-converter',
                    '/products/next-viro-nill',
                    '/products/next-vibriosis',
                    '/products/next-sludge'
                  ]
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd())
          }}
        />
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
