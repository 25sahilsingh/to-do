import dbconnect from "@/app/lib/db";
import { NextResponse } from "next/server";
const { Taskdetail } = require("@/model/task");
await dbconnect();
export async function PATCH(req, { params }) {
  const { id } = await params;
  const state = await Taskdetail.findById(id); //gettint the state change it if want to undo the task completion feature
  console.log("state:", state?.state);
  // https://www.mongodb.com/docs/manual/reference/operator/update/set/
  const changesdstate = await Taskdetail.findByIdAndUpdate(id, {
    $set: { state: 1 },
  });

  return NextResponse.json({ message: "allokay" });
}
