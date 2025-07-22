import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/status", (_req: Request, res: Response) => {
    res.status(200).send("Everything is fine");
});

app.listen(5000, () => console.log("Starting Express.js server on port 5000"));
