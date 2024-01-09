import { Lesson, Submission } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type LessonWithSubmissions = Lesson & { submissions: Submission[] };

export const useLessonQuery = (lessonId: string) => {
  return useQuery<{
    lesson: LessonWithSubmissions;
  }>({
    queryKey: ["lesson", lessonId],
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/lessons/${queryKey[1]}`
      );
      return data;
    },
  });
};
