import mongoose from "mongoose";

// Keep a reference to the connection status
let isConnected = false;
const mongoUrl = process.env.DB_URL;

 export const connectdb = async ()=> {

    if (isConnected) {
        console.log("Already connected to the database.");
        return;
      }

      console.log("Connecting to the database...");
      console.log(`MongoDB URL: ${mongoUrl}`)    
try {
    await mongoose.connect(mongoUrl, {

      useNewUrlParser: true,
            useUnifiedTopology: true,
      dbName:"pizza"
  
      
    });

    isConnected = true;
    console.log("Database connected.");
} catch (error) {

    isConnected = false;
    console.log("not connenct", error);
}
}