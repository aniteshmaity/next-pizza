import { Orders } from "@/models/orders";
import { connectdb } from "@/utils/db";
import { NextResponse } from "next/server";

connectdb().then(() => console.log("Database connection attempt made 4"));

export async function POST(req) {
    try {
        const { email } = await req.json();
        
        const order = await Orders.findOne({ email: email });

        if (!order) {
            throw new Error("No orders found for the user");
        }

        return NextResponse.json({
            message: "Found user's order data",
            success: true,
            data: order
        });
    } catch (error) {
        console.error("Error finding user orders:", error);

        return NextResponse.json({
            message: error.message || "Failed to find user orders",
            success: false
        }, {
            status: 404 // Or appropriate status code based on error
        });
    }
}
