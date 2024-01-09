import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { lessonId: string };
  }
) {
  try {
    const user = await currentUser();

    if (!params.lessonId) {
      return new NextResponse("Lesson ID missing", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lesson = await db.lesson.findUnique({
      where: { id: params.lessonId },
      include: {
        submissions: {
          where: { userId: user.id },
        },
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({ lesson });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
