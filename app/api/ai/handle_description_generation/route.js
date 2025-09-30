import { Client } from "@gradio/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  console.log("inside api call");
  const { task } = await req.json();
  const app = await Client.connect("025sahil/8bit_stablelm-2-1_6b-chat", {
    hf_token: process.env.HG_TOKEN,
  });
  console.log("completed the connection point inside api call");

  const result = await app.predict("/handle_task", [task]);
  console.log("printing result");
  return NextResponse.json({ description: result.data[0] });
};
