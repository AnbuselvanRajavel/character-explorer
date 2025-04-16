import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Rick & Morty Explorer",
  description: "Search and filter Rick & Morty characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
