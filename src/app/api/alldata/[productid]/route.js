import { PizzaData } from "@/models/pizzaData";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const{productid} = params
 
    try {
        const data = await PizzaData.findById(productid);
       return NextResponse.json({
          message:"product found",
          data:data
       })
    } catch (error) {
       return NextResponse.json({
          message:"product not found",
          error:error
       },
       { status: 404 }) 
 }
 }