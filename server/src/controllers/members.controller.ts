import { Request, Response } from "express";
import { pool } from "../index.js";
import type { AddMemberPayload } from "../../../packages/types/src/member.js";

export const getMembers = async (_req: Request, res: Response) => {
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

export const addMember = async (req: Request, res: Response) => {
  const { name, surname, color } = req.body as AddMemberPayload;

  if (!name || !surname) {
    res.status(400).json({ error: "name and surname are required" });
    return;
  }

  try {
    const {
      rows: [addedMember],
    } = await pool.query(
      `INSERT INTO members (name, surname, color)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, surname, color]
    );

    res.status(201).json({
      message: "Member added successfully",
      added: addedMember,
    });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
