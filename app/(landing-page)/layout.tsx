import React from "react";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export const LandingPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="flex items-center justify-center flex-col h-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
