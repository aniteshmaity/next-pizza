
import mongoose  from "mongoose"


const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
   
}, {
    timestamps:true
});

// Check if the model is already defined, if not, define it

export  const Users = mongoose.models.Users || mongoose.model("Users", dataSchema);