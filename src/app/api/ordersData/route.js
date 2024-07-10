import { Orders } from "@/models/orders";
import { connectdb } from "@/utils/db";
import { NextResponse } from "next/server";

connectdb().then(() => console.log("Database connection attempt made"));

export async function POST(req) {
    const { email, order_data, order_date } = await req.json();

    try {
        await order_data.splice(0, 0, { order_date: order_date });

        let existingOrder = await Orders.findOne({ email: email });

        if (!existingOrder) {
            // If order does not exist, create a new one
            const order = await Orders.create({
                email: email,
                order_data: [order_data]
            });

            if (!order) {
                throw new Error("Failed to create order");
            }

            return NextResponse.json({
                message: "Order created successfully",
                success: true
            });
        } else {
            // If order exists, update the existing order_data array
            await Orders.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order_data } }
            );

            return NextResponse.json({
                message: "Order updated successfully",
                success: true
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: 400 // Proper status code for client errors
        });
    }
}
