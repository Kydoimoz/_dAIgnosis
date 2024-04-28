import { React } from "react";
import { Schema, models, mongoose } from "mongoose";
const user_schema = new Schema({
    firstName: {
        type: String,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    newsletter: {
        default: true,
        type: Boolean,
    },
    role: {
        type: String,
        default: "patient",
    },
    receivedMessages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
      }],
      medications: [{
        _id: {
            type: Schema.Types.ObjectId
        },
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
        },
        time: {
            type: [String],
            default: () => [], 
        },
        notes:{
            type: String,
            required: false
        }
    }],
}, {timestamps: true});

const User = (models && models.Users) ? models.Users : mongoose.model("Users", user_schema);
module.exports = User;

