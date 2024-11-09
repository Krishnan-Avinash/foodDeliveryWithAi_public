import express from "express";
import { replyToPrompt } from "../controllers/gemini.controller.js";

const geminiRouter = express.Router();

geminiRouter.get("/geminiRes", replyToPrompt);

export default geminiRouter;
