// @ts-nocheck
import { config } from '@/lib/config';
import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdSpot } from "./AdSpot";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />
      
      {/* Sticky Footer Ad - Always visible at bottom */}
      <AdSpot position="sticky-bottom" zoneId={config.reviveZoneStickyFooter} className="w-full" />
    </div>
  );
};
