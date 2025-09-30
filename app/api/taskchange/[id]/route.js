import dbconnect from "@/app/lib/db";
import { Taskdetail } from "@/model/task";
import { NextResponse } from "next/server";

await dbconnect();
export async function GET(req, { params }) {
  const { id } = await params;
  const fetchdata = await Taskdetail.findById(id);
  console.log("fetchdatarouter:", fetchdata);
  return NextResponse.json(fetchdata);
}
export async function PUT(req, { params }) {
  const { id } = await params;
  const newdata = await req.json();

  const updateddata = await Taskdetail.findByIdAndUpdate(id, newdata);
  return NextResponse.json(updateddata);
}
export async function DELETE(req, { params }) {
  const { id } = await params;
  const temp = JSON.parse(id);
  for (let i of temp) {
    console.log(i);
    await Taskdetail.findByIdAndDelete(i);
  }
  return NextResponse.json({ message: "topic is deleted" }, { status: 200 });
}
