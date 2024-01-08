import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, currentUser } from "@clerk/nextjs";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center z-10">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Link href="/" className="font-bold">
          Stepik
        </Link>
        <div className="space-x-4 sm:block w-auto flex items-center justify-between">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link href="/sign-in">Войти</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Зарегистрироваться</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
