import dbconnect from "@/app/lib/db";
import { Taskdetail } from "@/model/task";
import { NextResponse } from "next/server";

await dbconnect();
export async function GET(request) {
  let fetchdata;
  const Search = request.nextUrl.searchParams.get("Search");
  if (Search) {
    fetchdata = await Taskdetail.find({
      tasktopic: { $regex: Search, $options: "i" },
    });
  } else {
    fetchdata = await Taskdetail.find();
  }
  return NextResponse.json(fetchdata);
}
export async function POST(request) {
  try {
    const data = await request.json();
    console.log("data:", data);
    const task = new Taskdetail(data);
    await task.save();
    return NextResponse.json(data);
  } catch (error) {
    console.log("this is error:", error);
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log("id", id);
  await Taskdetail.findByIdAndDelete(id);
  return NextResponse.json({ message: "topic is deleted" }, { status: 200 });
}
