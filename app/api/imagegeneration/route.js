import { Client } from "@gradio/client";
import { NextResponse } from "next/server";
export async function POST(req) {
  const task = await req.json();
  const client = await Client.connect("025sahil/create_logo_AI", {
    hf_token: process.env.HG_TOKEN,
  });
  const result = await client.predict("/infer", {
    prompt: task,
    negative_prompt: "Hello!!",
    seed: 0,
    randomize_seed: true,
    width: 256,
    height: 256,
    guidance_scale: 0,
    num_inference_steps: 1,
  });
  return NextResponse.json({ cloudinarylink: result.data[2] });
}

// const client = await Client.connect("025sahil/create_logo_AI", {
// });
// const result = await client.predict("/infer", {
//   prompt: "Hello!!",
//   negative_prompt: "Hello!!",
//   seed: 0,
//   randomize_seed: true,
//   width: 256,
//   height: 256,
//   guidance_scale: 0,
//   num_inference_steps: 1,
// });
// console.log(result.data);
// return NextResponse.json({ name: result.data[2] });
