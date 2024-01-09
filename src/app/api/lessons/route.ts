import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const lessons = await db.lesson.findMany({});

    return NextResponse.json({ lessons });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
