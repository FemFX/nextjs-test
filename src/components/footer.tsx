import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <div className="font-bold">Stepik</div>
        <div className="space-x-4 sm:block md:w-auto hidden items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            Политика конфиденциальности
          </Button>
          <Button size="sm" variant="ghost">
            Условия использования
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
