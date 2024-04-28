import {React} from "react";
import connectDB from "@/libs/connectDB";
import User from "@/models/dbschema";
export default async function handler(req, res) {
    const { method, query: { token, date } } = req;
    await connectDB();
    switch(method) {
    case "GET":
            try{
                const user = await User.findOne({ _id: token, date: date }); 
                if(!user){
                    return res.status(400).json({ error: "User not found.." })
                }
                const entries = user.medications.filter(entry => entry.date === date);
                if(entries) {
                    res.status(200).json(entries);
                }
                else{
                    console.error("Error");
                }
            } catch(err){
                console.error(err);
                res.status(400).json({ error: "Internal Server Error.." });
            }
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(400).end(`Method ${method} Not Allowed..`)
        }
}
