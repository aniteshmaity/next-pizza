
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Users } from "@/models/user";


export async function GET(request) {
    try {
      // Get token from headers (assuming the token is sent in the Authorization header)
      const authHeader = request.headers.get("Authorization");
      if (!authHeader) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 });
      }
  
      const token = authHeader.split(" ")[1];
      if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 });
      }
  
      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
  
      // Fetch user
      const user = await Users.findById(decoded._id).select("-password");
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      // Return user data
      return NextResponse.json(user);
    } catch (error) {
      console.error("Error verifying token or fetching user:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }