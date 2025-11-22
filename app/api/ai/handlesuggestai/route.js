import SuggestionAi from "@/app/components/SuggestionAi";
import { Client } from "@gradio/client";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  const { task } = await req.json();
  const app = await Client.connect(
    "025sahil/8bit_stablelm-2-1_6b_forsuggestion",
    {
      hf_token: process.env.HG_TOKEN,
    }
  );
  let date = new Date();
  date = date.toLocaleTimeString();
  const result = await app.predict("/handle_task", [date, task]);
  console.log("result:", result.data[0]);
  return NextResponse.json({ suggestion: result.data[0] });
};
