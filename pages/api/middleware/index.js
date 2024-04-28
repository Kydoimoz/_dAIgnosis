import { updateSession } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    const updatedResponse = await updateSession(req);

    return updatedResponse;
  } catch (error) {
    console.error("Error in middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}