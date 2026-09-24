import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";

// Modern, warm, human editorial sans-serif (used by high-end design agencies & editorial publications)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Editorial classic serif for headlines and storytelling
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PWD BUPCA Inc. | Empowering Persons with Determination",
  description: "Official portal of PWD BUPCA Inc. (Barangay UP Campus Association). Livelihood trainings, upcycled sustainable crafts, and community command center.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo-square.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`text-normal ${plusJakarta.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('pwd_bupca_theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors ${plusJakarta.className}`}>
        <AccessibilityProvider>
          {/* Skip to Main Content Link for screen readers & keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-700 text-white font-bold rounded-md shadow-lg"
          >
            Skip to main content
          </a>
          
          <div className="flex-1 flex flex-col">
            {children}
          </div>

          {/* Floating Accessibility Controls */}
          <AccessibilityToolbar />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
