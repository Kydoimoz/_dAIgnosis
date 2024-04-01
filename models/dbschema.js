import { React } from "react";
import { Schema } from "mongoose";
const user_schema = new Schema({
    username: {
        type: String,
        required: true,
    }
});