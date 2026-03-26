import express from "express";
import { initDb } from "./db.js";
import notesRouter from "./routes/notes.js";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok" }));
app.use("/notes", notesRouter);

const port = process.env.PORT ?? 3000;
initDb().then(() => app.listen(port, () => console.log(`API running on port ${port}`)));
