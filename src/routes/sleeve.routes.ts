import { Router } from "express";
import { createSleeve, delSleve, findAll, getById, updateSleve } from "../controllers/sleeve.controller";

const router = Router();

router.post('/sleeve', createSleeve);
router.get('/sleeve/list', findAll);
router.get("/sleeve/:id", getById);
router.put("/sleeve/:id", updateSleve);
router.delete("/sleeve/:id", delSleve);


export default router;