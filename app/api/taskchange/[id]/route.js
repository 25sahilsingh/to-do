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
  console.log("console from routejs", updateddata);
  return NextResponse.json(updateddata);
}
