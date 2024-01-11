import { NextResponse } from "next/server";
import { LessonsService } from "@/services/lessons.service";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { lessonId: string };
  }
) {
  try {
    const lesson = await LessonsService.getOne(params.lessonId);

    return NextResponse.json({ lesson });
  } catch (error) {
    const err = error as Error;
    if (err.message === "Unauthorized") {
      return new NextResponse(err.message, { status: 401 });
    }
    if (err.message === "Lesson ID missing") {
      return new NextResponse(err.message, { status: 400 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
