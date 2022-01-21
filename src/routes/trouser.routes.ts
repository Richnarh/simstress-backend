import { Router } from "express";
import { createTrouser, deleteTrouzer, findAll, getById, updateTrouzer, } from "../controllers/trouser.controller";

const router = Router();

router.post('/trousers', createTrouser);
router.get('/trousers/list', findAll);
router.get("/trousers/:id", getById);
router.put("/trousers/:id", updateTrouzer);
router.delete("/trousers/:id", deleteTrouzer);


export default router;