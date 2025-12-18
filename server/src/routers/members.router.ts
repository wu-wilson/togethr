import express from "express";
import * as util from "../controllers/members.controller.js";

const membersRouter = express.Router();

membersRouter.get("/", util.getMembers);
membersRouter.post("/add", util.addMember);
membersRouter.delete("/delete/:id", util.deleteMember);

export default membersRouter;
