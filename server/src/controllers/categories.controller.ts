import { Request, Response } from "express";
import { pool } from "../index.js";
import {
  AddCategoryPayload,
  AddCategoryResponse,
  Category,
  DeleteCategoryParams,
  DeleteCategoryResponse,
  UpdateCategoryParams,
  UpdateCategoryPayload,
  UpdateCategoryResponse,
} from "../../../packages/types/src/category.js";

export const getCategories = async (
  _req: Request,
  res: Response<Category[] | { error: string }>
) => {
  try {
    const { rows: categories } = await pool.query(
      `
      SELECT *
      FROM categories
      `
    );
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addCategory = async (
  req: Request<{}, AddCategoryResponse, AddCategoryPayload>,
  res: Response<AddCategoryResponse | { error: string }>
) => {
  const { name, color } = req.body;

  if (!name || !color) {
    res.status(400).json({ error: "name and color are required" });
    return;
  }

  try {
    const {
      rows: [addedCategory],
    } = await pool.query(
      `INSERT INTO categories (name, color)
       VALUES ($1, $2)
       RETURNING *`,
      [name, color]
    );

    res.status(201).json({
      message: "Category added successfully",
      added: addedCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (
  req: Request<DeleteCategoryParams>,
  res: Response<DeleteCategoryResponse | { error: string }>
) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "id is required" });
    return;
  }

  try {
    const {
      rows: [deletedCategory],
    } = await pool.query(
      `DELETE FROM categories
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (!deletedCategory) {
      res.status(404).json({ error: "Category does not exist" });
      return;
    }

    res.json({
      message: "Category removed successfully",
      deleted: deletedCategory,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCategory = async (
  req: Request<
    UpdateCategoryParams,
    UpdateCategoryResponse,
    UpdateCategoryPayload
  >,
  res: Response<UpdateCategoryResponse | { error: string }>
) => {
  const { id } = req.params;
  const { name, color } = req.body;

  if (!id || !name || !color) {
    res.status(400).json({ error: "id, name, and color are required" });
    return;
  }

  try {
    const {
      rows: [updatedCategory],
    } = await pool.query(
      `UPDATE categories
       SET
        name = $2,
        color = $3
       WHERE id = $1
       RETURNING *;`,
      [id, name, color]
    );

    if (!updatedCategory) {
      res.status(404).json({ error: "Category does not exist" });
      return;
    }

    res.json({
      message: "Category updated successfully",
      updated: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
