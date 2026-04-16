import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VitaShop — Vitamins & Supplements | South Africa',
  description:
    "South Africa's trusted online source for vitamins, minerals and supplements. Centrum, Berocca, Staminogro, Bio-Strath, Caltrate and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
