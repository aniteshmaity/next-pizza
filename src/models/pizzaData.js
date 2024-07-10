import mongoose from "mongoose";


const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    price: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
}, {
    timestamps:true
});

// Check if the model is already defined, if not, define it
export const PizzaData = mongoose.models.PizzaData || mongoose.model("PizzaData", dataSchema);