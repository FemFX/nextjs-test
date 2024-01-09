"use client";

import { useState } from "react";
import { Submission } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor";
import { useToast } from "@/components/ui/use-toast";
import { useLessonQuery } from "@/hooks/use-lesson-query";
import { useLessonMutation } from "@/hooks/use-lesson-mutation";

const LessonPage = ({ params }: { params: { lessonId: string } }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>("");

  const { data, isLoading, error } = useLessonQuery(params.lessonId);
  const { mutate, isPending } = useLessonMutation(
    data?.lesson.title!,
    params.lessonId
  );

  const handleSubmit = async () => {
    try {
      await mutate();
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
