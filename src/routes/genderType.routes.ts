import { Router } from "express";
import { createGenderType, deleteGender, updateGender, findAll, getById } from "../controllers/genderType.controller";

const router = Router();

router.post('/gender-type', createGenderType);
router.get('/gender-type/list', findAll);
router.get("/gender-type/:id", getById);
router.put("/gender-type/:id", updateGender);
router.delete("/gender-type/:id", deleteGender);


export default router;