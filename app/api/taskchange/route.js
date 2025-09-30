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
    const task = new Taskdetail(data);
    await task.save();
    return NextResponse.json({ taskid: task._id });
  } catch (error) {
    console.log("this is error:", error);
  }
  return NextResponse.json({ message: "post succesfully posted" });
}
