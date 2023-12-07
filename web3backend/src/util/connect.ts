import mongoose from "mongoose";
import config from "config";

const connect = async () => {
  const uri = config.get<string>("uri");
  const dbName = config.get<string>("dbName");
  try {
    await mongoose.connect(uri)
    console.log(`Database connection successfully to ${dbName}`);
  } catch (error) {
    console.error(error, "could not connected");
  }
};
export default connect;

