import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100 h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
