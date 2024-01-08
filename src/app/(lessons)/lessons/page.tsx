import { DataTableDemo } from "@/components/data-table";
import { db } from "@/lib/db";

const LessonsPage = async () => {
  const data = await db.lesson.findMany({});
  return (
    <div>
      <div className="font-bold mb-4 text-xl">Задачи</div>
      <DataTableDemo data={data} />
    </div>
  );
};

export default LessonsPage;
