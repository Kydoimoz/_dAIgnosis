export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json");

    try {
        const response = await fetch("https://private-f13ec-daignosis.apiary-mock.com/medications", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch medications: ${response.statusText}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching medications:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}