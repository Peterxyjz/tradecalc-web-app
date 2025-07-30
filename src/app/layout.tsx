import type { Metadata } from "next";
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: "TradeCalc",
  description: "Smart Trade Entry Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
