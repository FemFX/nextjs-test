import { NextResponse } from "next/server";
import { LessonsService } from "@/services/lessons.service";

export async function GET(req: Request) {
  try {
    const lessons = await LessonsService.getAll();

    return NextResponse.json({ lessons });
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message === "Unauthorized") {
      return new NextResponse(err.message, { status: 401 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
