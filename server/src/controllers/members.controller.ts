import { Request, Response } from "express";
import { pool } from "../index.js";

export const getMembers = async (req: Request, res: Response) => {
  try {
    const { rows: members } = await pool.query(
      `
      SELECT *
      FROM members
      `
    );
    res.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
