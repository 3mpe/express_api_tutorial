
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
})

export default mongoose.model("User", User);