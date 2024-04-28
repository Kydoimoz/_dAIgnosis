import connectDB from "@/libs/connectDB";
import Message from "@/models/Message";

export default async function handler(req, res) {
    if(req.method === "GET") {
        try{
            await connectDB();
            const user_id = req.query.user_id;
            const messages = await Message.find({receiver: user_id}).sort({createdAt: "asc"});
            res.status(200).json({messages});
        }
        catch(err) {
            console.error(err);
            res.status(400).json({error: "Server Error..."});
        }
    }
    else {
        res.staus(400).json({error: "Method Not Allowed.."});
    }
}