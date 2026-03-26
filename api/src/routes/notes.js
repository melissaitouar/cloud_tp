import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM notes ORDER BY created_at DESC");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: "title is required" });
  const { rows } = await pool.query(
    "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  res.status(201).json(rows[0]);
});

router.get("/:id", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM notes WHERE id = $1", [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: "note not found" });
  res.json(rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { rows } = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: "note not found" });
  res.sendStatus(204);
});

export default router;
