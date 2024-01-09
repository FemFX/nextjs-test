import { DataTable } from "@/components/data-table";
import { Lesson } from "@prisma/client";

async function getLessons(): Promise<{ lessons: Lesson[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/lessons`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const LessonsPage = async () => {
  const { lessons } = await getLessons();

  return (
    <div>
      <div className="font-bold mb-4 text-xl">Задачи</div>
      <DataTable data={lessons} />
    </div>
  );
};

export default LessonsPage;
