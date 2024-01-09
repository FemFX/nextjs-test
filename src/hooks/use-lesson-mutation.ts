import { useToast } from "@/components/ui/use-toast";
import { Submission } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useLessonMutation = (title: string, lessonId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/submissions/${lessonId}`
      );
      return data;
    },
    onSuccess: ({ submission }: { submission: Submission }) => {
      toast({
        title: title,
        description: `${submission.result}`,
      });
      queryClient.invalidateQueries({ queryKey: ["lesson", lessonId] });
    },
  });
};
