import { Router } from "express";
import { createCourse,delCourse,findAll,getById, updateCours } from "../controllers/course.controller";

const router = Router();

router.post('/course', createCourse);
router.get('/course/list', findAll);
router.get("/course/:id", getById);
router.put("/course/:id", updateCours);
router.delete("/course/:id", delCourse);

export default router;