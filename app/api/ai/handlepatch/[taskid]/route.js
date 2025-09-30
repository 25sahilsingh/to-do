import { Taskdetail } from "@/model/task";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { taskid } = await params;
  const data = await req.json();
  console.log("taskid", taskid);
  console.log("data", data);
  const responsez = await Taskdetail.findByIdAndUpdate(taskid, {
    $set: {
      logo: data.imageurl.cloudinarylink,
      desc: data.taskdescription.description,
    },
  });
  return NextResponse.json({
    message: responsez,
  });
}
