import { NextResponse } from "next/server";

export function handleErrorResponse(error: unknown): NextResponse {
  if (error instanceof Error) {
    switch (error.message) {
      case "Unauthorized":
        return new NextResponse(error.message, { status: 401 });
      case "Lesson ID missing":
        return new NextResponse(error.message, { status: 400 });
    }
  }
  return new NextResponse("Internal Error", { status: 500 });
}
