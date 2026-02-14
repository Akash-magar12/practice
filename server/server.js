import connectDB from "./db/db.js";
import dotenv from "dotenv";
import app from "./src/app.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectDB();
    console.log('DB Connected')
    app.listen(PORT,()=>{
        console.log(`Server running at ${PORT}`)
    })
  } catch (error) {
    console.log("error in connecting server",error.message)
  }
  
};

startServer();
