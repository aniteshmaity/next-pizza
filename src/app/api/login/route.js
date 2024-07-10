import { Users } from "@/models/user";
import { connectdb } from "@/utils/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectdb().then(() => console.log("Database connection attempt made"));

export async function POST(req){

    const {email, password}= await req.json();
    // console.log("Received email:", email);  // Log incoming email
try {

    const user = await Users.findOne({
        email:email
    });
    // console.log("Found user:", user);  // Log found user
    if(user == null){
        throw new Error("the user is invalid")
    }
     //  compre pasword
     const pass = await bcrypt.compare(password, user.password);
     console.log("matchpass", pass);
     if (!pass) {
        throw new Error("password not matched");
      }
      // create jwt token
      // jwt token only generate on login not signup
      const token =  jwt.sign({
_id:user.id,
name:user.name
      },process.env.SECRET_KEY );

      console.log(token);
      return NextResponse.json({
        message:"login successfully",
        success:true,
        token:token
      });
} catch (error) {
    console.log(error);
    return NextResponse.json({
        message:error.message,
        success:false

    },{
        status: 404,
      })
}
}