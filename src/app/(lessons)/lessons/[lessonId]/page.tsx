"use client";

import { Lesson, Submission } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type LessonWithSubmissions = Lesson & { submissions: Submission[] };

const LessonPage = ({ params }: { params: { lessonId: string } }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>("");

  const { data, isLoading, error } = useQuery<{
    lesson: LessonWithSubmissions;
  }>({
    queryKey: ["lesson", params.lessonId],
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/lessons/${queryKey[1]}`
      );
      return data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (lessonId: string) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/submissions/${lessonId}`
      );
      return data;
    },
    onSuccess: ({ submission }: { submission: Submission }) => {
      toast({
        title: data?.lesson.title,
        description: `${submission.result}`,
      });
      queryClient.invalidateQueries({ queryKey: ["lesson", params.lessonId] });
    },
  });

  const handleSubmit = async () => {
    try {
      await mutate(params.lessonId);
      setValue("");
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="w-full">
      <div className="flex justify-center font-bold text-2xl">
        {data.lesson.title}
      </div>
      <div className="my-7">
        <span className="font-bold">Условие:</span> {data.lesson.task}
      </div>
      <Editor value={value} setValue={setValue} />
      <div className="flex justify-between mt-3">
        <div>Попыток: {data.lesson.submissions.length}</div>
        <Button disabled={isPending || !value} onClick={handleSubmit}>
          {!isPending ? <>Отправить</> : <Loader2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default LessonPage;
