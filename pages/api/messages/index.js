import connectDB from "@/libs/connectDB";
import User from "@/models/dbschema";
import Message from "@/models/Message";
export default async function handler (req, res){
    try{
        await connectDB();
        if(req.method === "POST") {
            const {content, receiver, sender, isUser} = req.body;
            try {
                const newMessage = new Message({
                    content: content, receiver: receiver, sender: sender, isUser: isUser 
                })
                const savedMessages = await newMessage.save();

                res.status(201).json({ message: savedMessages});
            }
            catch(err){
                console.error(err);
                res.status(400).json({error: "Server Error"});
            }
        }
        else {
            res.status(400).json({error: "Method Not Allowed..."});
        }
    }
    catch(err) {
        console.error(err);
    }
}
