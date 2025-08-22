import mongoose from "mongoose";
const dbconnect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URL, {
      dbName: "to-do",
    });
  } catch (error) {
    console.log("error:", error);
  }
};
export default dbconnect;
