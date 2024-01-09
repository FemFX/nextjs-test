import { db } from "@/lib/db";
import { getRandomBoolean } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
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
    const submission = await db.submission.create({
      data: {
        result: getRandomBoolean(),
        userId: user.id,
        lessonId: params.lessonId,
      },
    });

    return NextResponse.json({ submission });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
