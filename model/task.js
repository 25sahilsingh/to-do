import mongoose, { Schema } from "mongoose";
const taskmodel = new Schema({
  tasktopic: String,
  desc: String,
  logo: String,
  state: Boolean,
  iscountdown: Boolean,
  timer: Number,
});
export const Taskdetail =
  mongoose.models?.Taskdetail || mongoose.model("Taskdetail", taskmodel);
