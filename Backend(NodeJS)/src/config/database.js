import mongoose from "mongoose";

const connect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/Vyas");
  console.log("database is connected");
};
export default connect;
