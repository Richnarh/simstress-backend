import { Router } from "express";
import { createSleet, delSleet, findAll, getById, updateslet } from "../controllers/sleet.controller";

const router = Router();

router.post('/sleet', createSleet);
router.get('/sleet/list', findAll);
router.get("/sleet/:id", getById);
router.put("/sleet/:id", updateslet);
router.delete("/sleet/:id", delSleet);


export default router;