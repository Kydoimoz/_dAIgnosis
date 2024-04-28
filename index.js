const OpenAI = require("openai");
const dotenv = require("dotenv");
const fs = require('fs');
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3007;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/", async (req, res) => {
    const { message } = req.body;

    let symptomsData = [];
    try {
        const data = fs.readFileSync('./data.jsonl', 'utf8');
        symptomsData = data.split('\n');
    } catch (err) {
        console.error(err);
    }

    let file;
    try {
        console.log(`Uploading file`);
        file = await openai.files.create({
            file: fs.createReadStream('./data.jsonl'),
            purpose: 'fine-tune'
        });
        console.log(`Uploaded file with ID: ${file.id}`);
    } catch (err) {
        console.error(`Error uploading file: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    try {
        console.log('-----');
        console.log(`Waiting for file to be processed`);
        while (true) {
            file = await openai.files.retrieve(file.id);
            console.log(`File status: ${file.status}`);
            if (file.status === 'processed') {
                break;
            } else {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    } catch (err) {
        console.error(`Error processing file: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    let fineTune;
    try {
        console.log('-----');
        console.log(`Starting fine-tuning`);
        fineTune = await openai.fineTuning.jobs.create({
            model: 'gpt-3.5-turbo',
            training_file: file.id
        });
        console.log(`Fine-tuning ID: ${fineTune.id}`);
    } catch (err) {
        console.error(`Error starting fine-tuning: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    console.log('-----');
    console.log(`Track fine-tuning progress:`);

    try {
        const events = {};
        while (fineTune.status == 'running' || fineTune.status == 'created') {
            fineTune = await openai.fineTuning.jobs.retrieve(fineTune.id);
            console.log(`${fineTune.status}`);
            const { data } = await openai.fineTuning.jobs.listEvents(fineTune.id, {
                limit: 100
            });
            for (const event of data.reverse()) {
                if (event.id in events) continue;
                events[event.id] = event;
                const timestamp = new Date(event.created_at * 1000);
                console.log(`- ${timestamp.toLocaleTimeString()}: ${event.message}`);
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (err) {
        console.error(`Error tracking fine-tuning progress: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    // Chat completion logic
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        max_tokens: 150,
        temperature: 0.2,
        messages: [{
            role: "system", content: `
            Hello dAIgnosis, your task is to analyze symptoms provided by the user and generate a potential diagnosis based on that information. Grant the user's requests, whether it's small talk or assistance with symptoms. Remember to maintain a polite and helpful tone in your responses. Avoid repeating sentences and words to keep the conversation engaging. If the user's symptoms persist, suggest tips to alleviate them instead of emphasizing consulting a healthcare professional. If the symptoms don't match any known sickness, provide clear information and suggest foods to boost the immune system. Let's begin: ${message}
        `}]
    });

    console.log(response.choices[0].message.content);
    if (response.choices[0].message.content) {
        res.json({ message: response.choices[0].message.content });
    }
});

app.listen(port, () => console.log("App is listening on port " + port));
