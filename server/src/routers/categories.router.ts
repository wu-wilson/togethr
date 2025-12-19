import express from "express";
import * as util from "../controllers/categories.controller.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", util.getCategories);
categoriesRouter.post("/add", util.addCategory);
categoriesRouter.delete("/delete/:id", util.deleteCategory);
categoriesRouter.patch("/update/:id", util.updateCategory);

export default categoriesRouter;
