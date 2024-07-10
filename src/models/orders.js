
import mongoose  from "mongoose"


const orderSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
      },
   
}, {
    timestamps:true
});

// Check if the model is already defined, if not, define it

export  const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema);