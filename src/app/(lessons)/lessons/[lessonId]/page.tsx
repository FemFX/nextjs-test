"use client";
import { Lesson, Submission } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Button } from "@/components/ui/button";
import { useId } from "react";

type LessonWithSubmissions = Lesson & { submissions: Submission[] };

const LessonPage = ({ params }: { params: { lessonId: string } }) => {
  const id = useId();
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
  function onChange(newValue: any) {
    console.log("change", newValue);
  }
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
      <AceEditor
        mode="javascript"
        theme="github"
        onChange={onChange}
        name={id}
        editorProps={{ $blockScrolling: true }}
        className="editor"
      />
      <div className="flex justify-between mt-3">
        <div>Попыток: {data.lesson.submissions.length}</div>
        <Button>Отправить</Button>
      </div>
    </div>
  );
};

export default LessonPage;
