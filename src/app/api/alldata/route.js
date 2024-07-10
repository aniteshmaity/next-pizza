
import { PizzaData } from "@/models/pizzaData";
import { connectdb } from "@/utils/db";
import { NextResponse } from "next/server";

connectdb();

export async function POST(req) {
//    const alldata = await req.json(); // parse the req body because By default, Express doesn't understand JSON data directly. It receives the request body as a raw string of characters.
 
const alldata = await req.json();

 // Check if req.body is undefined or empty
 if (!req.body) {
  console.log('Request body is empty or undefined.');
  return NextResponse.json({ success: false, message: 'Request body is empty or undefined.' });
}
try {
    const createdPizzas = []; // Array to store created pizzas
   
    for(const pizzadata of alldata ){
        const {name,category,foodType, price, description,img} = pizzadata;

 


    const createData = await PizzaData.create({
        name,
        category,
        foodType,
        price,
        description,
        img
    })
    console.log(`Pizza created: ${createData.name}`);
    createdPizzas.push(createData); // Add created pizza to the array
}
    return NextResponse.json({success:"created", data: createdPizzas})
} catch (error) {
    console.log(error);
    return NextResponse.json({success:"not created", error: error.message })
}

}

export async function GET() {
    try {
        const allgetdata= await PizzaData.find();
        return NextResponse.json({sucess:true, data:allgetdata});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false, error:error.message})
    }
}
