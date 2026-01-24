import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"] });
export const metadata: Metadata = {
  metadataBase: new URL('https://autojo.vercel.app'),
  // 1. العنوان والوصف الأساسي
  title: "AutoJo | حاسبة جمارك وقروض السيارات في الأردن 2026",
  description: "دليلك الشامل لحساب جمارك السيارات الكهربائية والهايبرد في الأردن، وحساب أقساط القروض البنكية والتوفير المتوقع عند التحول للسيارات الكهربائية.",
  
  // 2. الكلمات المفتاحية (عشان جوجل يفهم موقعك)
  keywords: [
    "جمارك السيارات الأردن", "حاسبة جمارك 2026", "سيارات كهربائية الأردن", 
    "ضريبة السيارات الكهربائية", "قروض السيارات", "توفير البنزين", 
    "AutoJo", "Jordan Customs Calculator", "EV Jordan"
  ],

  // 3. اسم المطور (يضيف مصداقية)
  authors: [{ name: "Yanal Abu Touq", url: "https://www.linkedin.com/in/yanal-abutouq-6b2484377/" }],
  creator: "Yanal Abu Touq",

  // 4. الأيقونات (اللوجو)
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png', // لأجهزة الآيفون
  },

  // 5. إعدادات المشاركة (Open Graph) - كيف بيطلع شكل الرابط ع الواتساب وفيسبوك
  openGraph: {
    title: "AutoJo | حاسبة جمارك السيارات الأردنية 2026",
    description: "احسب جمارك سيارتك، قسطك البنكي، ومقدار توفيرك عند شراء سيارة كهربائية في الأردن.",
    url: "https://autojo.vercel.app", // (غير هذا الرابط لما ترفع الموقع)
    siteName: "AutoJo",
    images: [
      {
        url: '/logo.png', // الصورة اللي بتطلع لما تبعث الرابط لحدا
        width: 800,
        height: 600,
        alt: 'AutoJo Logo',
      },
    ],
    locale: 'ar_JO',
    type: 'website',
  },

  // 6. إعدادات تويتر
  twitter: {
    card: 'summary_large_image',
    title: "AutoJo | حاسبة السيارات الأردنية",
    description: "دليلك الشامل لجمارك وقروض السيارات في الأردن 2026",
    images: ['/logo.png'],
  },

  // 7. توجيه العناكب (Robots)
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      {/* لا تضع head هنا أبداً، Next.js سيتولى الأمر */}
      <body className={cairo.className}>
        {/* كود الإعلانات - آمن هنا */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2836306682886866"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {children}
      </body>
    </html>
  );
}