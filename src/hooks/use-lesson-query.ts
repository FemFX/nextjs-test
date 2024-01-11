import { LessonWithSubmissions } from "@/services/lessons.service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
