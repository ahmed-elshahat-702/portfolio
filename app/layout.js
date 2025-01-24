import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Ahmed Elshahat",
  description: "Ahmed Elshahat portfolio website",
  icons: [
    {
      rel: "icon",
      href: "/icons/favicon.ico",
      url: "/icons/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/icons/apple-touch-icon.png",
      url: "/icons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/icons/favicon-32x32.png",
      url: "/icons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/icons/favicon-16x16.png",
      url: "/icons/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/icons/favicon-96x96.png",
      url: "/icons/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/icons/android-chrome-192x192.png",
      url: "/icons/android-chrome-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      href: "/icons/android-chrome-512x512.png",
      url: "/icons/android-chrome-512x512.png",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/icons/favicon.svg",
    },
    {
      rel: "shortcut icon",
      url: "/icons/favicon.ico",
    },
    {
      rel: "manifest",
      url: "/icons/site.webmanifest",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <Providers>
          <main className="w-full bg-primary-pink dark:bg-muted/40 relative">
            <Navbar />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
