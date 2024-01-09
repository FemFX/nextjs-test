"use client";
import { useUser } from "@clerk/nextjs";
import { Attempt, Lesson } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

type LessonWithAttempts = Lesson & { attempts: Attempt[] };

const LessonPage = ({ params }: { params: { lessonId: string } }) => {
  const { user } = useUser();
  const { data, isLoading, error } = useQuery<{ lesson: LessonWithAttempts }>({
    queryKey: ["lesson", params.lessonId],
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/lessons/${queryKey[1]}`
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }
  if (!data?.lesson || error) {
    return <p>Что-то пошло не так...</p>;
  }
  return (
    <div>
      <div className="flex justify-center font-bold text-xl">
        {data.lesson.title}
      </div>
      <div className="mt-7">
        <span className="font-bold">Условие:</span> {data.lesson.task}
      </div>
    </div>
  );
};

export default LessonPage;
