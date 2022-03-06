import { Router } from "express";
import { createFabricType, findAll, updateFabricType, deleteFabricType, getById } from "../controllers/fabrictType.controller";

const router = Router();

router.post('/fabric-type', createFabricType);
router.get('/fabric-type/list', findAll);
router.get("/fabric-type/:id", getById);
router.put("/fabric-type/:id", updateFabricType);
router.delete("/fabric-type/:id", deleteFabricType);

export default router;