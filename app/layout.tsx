import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Islii Market — Eastleigh's Jumia",
  description: "Eastleigh's leading online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="antialiased bg-[#F8F9FA]">{children}</body>
    </html>
  );
}
