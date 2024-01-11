import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Lesson, Submission } from "@prisma/client";

export type LessonWithSubmissions = Lesson & { submissions: Submission[] };

export class LessonsService {
  static async getAll(): Promise<Lesson[]> {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }
    return db.lesson.findMany({});
  }

  static async getOne(lessonId: string): Promise<LessonWithSubmissions | null> {
    const user = await currentUser();

    if (!lessonId) {
      throw new Error("Lesson ID missing");
    }

    if (!user) {
      throw new Error("Unauthorized");
    }

    const lesson = await db.lesson.findUnique({
      where: { id: lessonId },
      include: {
        submissions: {
          where: { userId: user.id },
        },
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return lesson;
  }
}
