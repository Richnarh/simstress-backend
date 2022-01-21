import { Router } from "express";
import { createKaba, updateKab, delKaba, getById, findAll } from "../controllers/kaba.controller";

const router = Router();

router.post('/kaba', createKaba);
router.get('/kaba/list', findAll);
router.get("/kaba/:id", getById);
router.put("/kaba/:id", updateKab);
router.delete("/kaba/:id", delKaba);


export default router;