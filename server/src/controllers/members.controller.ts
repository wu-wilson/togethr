import { Request, Response } from "express";
import { pool } from "../index.js";
import type {
  AddMemberPayload,
  AddMemberResponse,
  DeleteMemberParams,
  DeleteMemberResponse,
  Member,
  UpdateMemberParams,
  UpdateMemberPayload,
  UpdateMemberResponse,
} from "../../../packages/types/src/member.js";

export const getMembers = async (
  _req: Request,
  res: Response<Member[] | { error: string }>
) => {
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

export const addMember = async (
  req: Request<{}, AddMemberResponse, AddMemberPayload>,
  res: Response<AddMemberResponse | { error: string }>
) => {
  const { name, surname, color } = req.body;

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

export const deleteMember = async (
  req: Request<DeleteMemberParams>,
  res: Response<DeleteMemberResponse | { error: string }>
) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "id is required" });
    return;
  }

  try {
    const {
      rows: [deletedMember],
    } = await pool.query(
      `DELETE FROM members
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (!deletedMember) {
      res.status(404).json({ error: "Member does not exist" });
      return;
    }

    res.json({
      message: "Member removed successfully",
      deleted: deletedMember,
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMember = async (
  req: Request<UpdateMemberParams, UpdateMemberResponse, UpdateMemberPayload>,
  res: Response<UpdateMemberResponse | { error: string }>
) => {
  const { id } = req.params;
  const { name, surname, color } = req.body;

  if (!id || !name || !surname || !color) {
    res
      .status(400)
      .json({ error: "id, name, surname, and color are required" });
    return;
  }

  try {
    const {
      rows: [updatedMember],
    } = await pool.query(
      `UPDATE members
       SET
        name = $2,
        surname = $3,
        color = $4,
        updated_at = NOW()
       WHERE id = $1
       RETURNING *;`,
      [id, name, surname, color]
    );

    if (!updatedMember) {
      res.status(404).json({ error: "Member does not exist" });
      return;
    }

    res.json({
      message: "Member updated successfully",
      updated: updatedMember,
    });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
