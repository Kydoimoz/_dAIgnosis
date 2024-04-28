import {React} from "react";
export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json");
    try{
        res.status(201).json({message: "dAIgnosis welcomes :) -API "});
    }
    catch(err) {
        console.error("ERR! " , err);
    }
}