import { Router } from "express";
import { createSleeve, delSleve, findAll, getById, updateSleve } from "../controllers/sleeve.controller";

const router = Router();

router.post('/sleeves', createSleeve);
router.get('/sleeves/list', findAll);
router.get("/sleeves/:id", getById);
router.put("/sleeves/:id", updateSleve);
router.delete("/sleeves/:id", delSleve);


export default router;