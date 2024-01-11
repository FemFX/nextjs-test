import { db } from "@/lib/db";
import { getRandomBoolean } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { Submission } from "@prisma/client";

export class SubmissionsService {
  static async create(lessonId: string): Promise<Submission> {
    const user = await currentUser();

    if (!lessonId) {
      throw new Error("Lesson ID missing");
    }

    if (!user) {
      throw new Error("Unauthorized");
    }
    const submission = await db.submission.create({
      data: {
        result: getRandomBoolean(),
        userId: user.id,
        lessonId: lessonId,
      },
    });

    return submission;
  }
}
