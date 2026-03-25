import { NextRequest, NextResponse } from "next/server";
import { submitTask } from "@/lib/firebase/tasks";

export async function POST(req: NextRequest) {
  try {
    const { taskId, userId, content, fileUrl } = await req.json();

    if (!taskId || !userId || !content) {
      return NextResponse.json({ error: "Missing required fields: taskId, userId, content" }, { status: 400 });
    }

    await submitTask(taskId, userId, content, fileUrl);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Submit task error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit task" }, { status: 500 });
  }
}