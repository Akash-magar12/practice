import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`,
      {
        dbName: "posts",
      },
    );
    console.log(`MongoDB connected! ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection Failed ", error.message);
    process.exit(1);
  }
};

export default connectDB;
