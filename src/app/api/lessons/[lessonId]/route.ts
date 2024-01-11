import { NextResponse } from "next/server";
import { LessonsService } from "@/services/lessons.service";
import { handleErrorResponse } from "@/lib/error-handler";

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
    return handleErrorResponse(error);
  }
}
