import connectDB from "../../../libs/connectDB";
import User from "../../../models/dbschema";
export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json");
    try{
        await connectDB();
        const {email} = req.body;
        const db_data = await User.findOne({email}).select("_id");
        res.status(201).json({db_data});
    }
    catch(err) {
        console.error(err);
    }
}