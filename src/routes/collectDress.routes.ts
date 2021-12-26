import { Router } from "express";
import { createCollectDress, deleteDress, findAll, getById, updateDress } from "../controllers/collectDress.controller";
import { updateCollectDress } from "../services/collectDress.service";

const router = Router();

router.post('/collect-dress', createCollectDress);
router.get('/collect-dress/list', findAll);
router.get("/collect-dress/:id", getById);
router.put("/collect-dress/:id", updateDress);
router.delete("/collect-dress/:id", deleteDress);


export default router;