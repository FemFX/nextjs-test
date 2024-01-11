import { NextResponse } from "next/server";
import { SubmissionsService } from "@/services/submissions.service";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { lessonId: string };
  }
) {
  try {
    const submission = await SubmissionsService.create(params.lessonId);

    return NextResponse.json({ submission });
  } catch (error: unknown) {
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
