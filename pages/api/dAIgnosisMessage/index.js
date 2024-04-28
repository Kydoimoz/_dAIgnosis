// Import necessary dependencies and models
import connectDB from "@/libs/connectDB";
import Message from "@/models/Message";

// Define the API endpoint handler
export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            // Connect to the database
            await connectDB();

            // Fetch messages sent by dAIgnosis
            const messages = await Message.find({ sender: "dAIgnosis" }).sort({ createdAt: "asc" });
            console.log(messages);
            // Return the fetched messages as a response
            res.status(200).json({ messages });
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: "Server Error..." });
        }
    } else {
        res.status(400).json({ error: "Method Not Allowed.." });
    }
}
