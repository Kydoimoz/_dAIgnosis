import React from "react";
import mongoose from "mongoose";
export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        console.log("Successfully connected to MONGODB :)");
    }
    catch (err) {
        console.log("Error caught at: ", err);
    }
}