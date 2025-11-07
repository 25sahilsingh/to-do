import SuggestionAi from "@/app/components/SuggestionAi";
import { Client } from "@gradio/client";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  const { task } = await req.json();
  console.log("task:", task);
  const app = await Client.connect(
    "025sahil/8bit_stablelm-2-1_6b_forsuggestion",
    {
      hf_token: process.env.HG_TOKEN,
    }
  );
  const result = await app.predict("/handle_task", ["10:30PM", task]);
  console.log("result:", result.data[0]);
  return NextResponse.json({ suggestion: result.data[0] });
};
