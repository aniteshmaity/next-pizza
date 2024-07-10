import { Users } from "@/models/user";
import { connectdb } from "@/utils/db";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";



export async function POST(request) {
   await connectdb();
   
    try {
        const { name,
            email,
            password,
            geolocation } = await request.json();
        console.log(name,
            email,
            password,
            geolocation);
        //generate salt
        const salt = await bcrypt.genSalt();

        //hash password
        const hashPass = await bcrypt.hash(password, salt);
        
        const createUser = await Users.create({
            name,
            email,
            password: hashPass,
         location:geolocation
        });
        console.log("user details", createUser);
        return NextResponse.json({ success: "created", data: createUser }, {
            status: 201
        })

    } catch (error) {
        return NextResponse.json({ success: false, message: "not created", data: error.message })
    }
}