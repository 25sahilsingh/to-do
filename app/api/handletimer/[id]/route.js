import dbconnect from "@/app/lib/db";
import { Taskdetail } from "@/model/task";
import { NextResponse } from "next/server";
dbconnect();
export async function PATCH(req, { params }) {
  const { id } = await params;
  const data = await req.json();
  console.log(data);
  console.log(id);
  // https://www.mongodb.com/docs/manual/reference/operator/update/set/
  const changesdstate = await Taskdetail.findByIdAndUpdate(id, {
    $set: { timer: data },
  });
  return NextResponse.json({ message: "allokay" });
}
