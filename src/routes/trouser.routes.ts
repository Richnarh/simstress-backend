import { Router } from "express";
import { createTrouser, deleteTrouzer, findAll, getById, updateTrouzer, } from "../controllers/trouser.controller";

const router = Router();

router.post('/trouser', createTrouser);
router.get('/trouser/list', findAll);
router.get("/trouser/:id", getById);
router.put("/trouser/:id", updateTrouzer);
router.delete("/trouser/:id", deleteTrouzer);


export default router;