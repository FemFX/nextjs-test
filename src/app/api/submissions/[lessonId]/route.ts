import { NextResponse } from "next/server";
import { SubmissionsService } from "@/services/submissions.service";
import { handleErrorResponse } from "@/lib/error-handler";

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
    return handleErrorResponse(error);
  }
}
