import Navbar from "@/components/navbar";
import { ReactNode } from "react";

const LessonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-24 bg-slate-100 h-full container">{children}</main>
    </div>
  );
};

export default LessonLayout;
