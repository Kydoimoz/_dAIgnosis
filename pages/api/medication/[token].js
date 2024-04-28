import User from "@/models/dbschema";
import connectDB from "@/libs/connectDB";

export default async function handler(req, res){
    const { method, query: { token, date } } = req;
    await connectDB();
    
    switch(method){
        case "POST":
            try{
                const { date, medication } = req.body;
                const user = await User.findOne({ _id: token }); 
                if(!user){
                    return res.status(400).json({error: "User not found"})
                }
                user.medications.push({ ...medication, date: new Date(date) });
                await user.save();
                res.status(200).json({ message: "Medication entry saved successfully" });
            } catch(err){
                console.error(err);
                res.status(400).json({ error: "Internal Server Error.." });
            }
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(400).end(`Method ${method} Not Allowed..`)
    }
}
