import { Medal } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const DashboardPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          №1 образовательная платформа
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Облегчаем процесс обучения
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-3 rounded-lg pb-4 w-fit">
          Next.js | Stepik
        </div>
      </div>

      <p
        className={cn(
          textFont.className,
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto"
        )}
      >
        Совместная работа, управление образовательными проектами и достижение
        новых вершин в учебном процессе.
      </p>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Перейти к задачам</Link>
      </Button>
    </div>
  );
};

export default DashboardPage;
