import { Taskdetail } from "@/model/task";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { taskid } = await params;
  const data = await req.json();
  await Taskdetail.findByIdAndUpdate(taskid, {
    $set: { logo: data.cloudinarylink },
  });
  return NextResponse.json({ message: "worked okay image updated" });
}
