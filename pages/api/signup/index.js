import React from "react";
import connectDB from "../../../libs/connectDB";
import User from "../../../models/dbschema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default async function handler (req, res) {
    res.setHeader('Content-Type', 'application/json');
    try{
        if(req.method !== "POST") {
            return res.status(404).json({error: "Method Not Allowed"});

        }
        await connectDB();
        const {firstName, surname, email, password, receivedMessages, newsletter, role, medications} = req.body;
        console.log("Data received: " + req.body.name);

      const hash_pw = await bcrypt.hash(password, 10);
      const user = await User.create({
            firstName, 
            surname, 
            email,
            password: hash_pw,
            role,
            medications,
            receivedMessages,
            newsletter,
            isVerified: true,
        });
        console.log("SUCCESS");
       /* const user_Id = user._id.toString();
        const payload = {
            user_Id,
            firstName,
            surname,
            email,
            role,
            medications,
            receivedMessages,
            newsletter,
            password: hash_pw,
            isVerfied: true,
        }
        const options = {
            expiresIn: "60d"
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        console.log("Success...");
        return res.status(201).json({token})
*/
    }
    catch(err) {
        console.error(err);
        return res.status(404).json({error: "Internal Server Error: " + err});
    }
}