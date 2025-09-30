import dbconnect from "@/app/lib/db";
import { NextResponse } from "next/server";
const { Taskdetail } = require("@/model/task");
await dbconnect();
export async function PATCH(req, { params }) {
  const { id } = await params;
  const temp = JSON.parse(id);
  for (let i of temp) {
    console.log(i);
    await Taskdetail.findByIdAndUpdate(i, {
      $set: { state: 1 },
    });
  }
  // https://www.mongodb.com/docs/manual/reference/operator/update/set/

  return NextResponse.json({ message: "allokay" });
}
