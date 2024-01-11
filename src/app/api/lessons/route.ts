import { NextResponse } from "next/server";
import { LessonsService } from "@/services/lessons.service";
import { handleErrorResponse } from "@/lib/error-handler";

export async function GET(req: Request) {
  try {
    const lessons = await LessonsService.getAll();

    return NextResponse.json({ lessons });
  } catch (error: unknown) {
    return handleErrorResponse(error);
  }
}
