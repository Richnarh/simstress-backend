import { Router } from "express";
import { units, relationship, cardStatus, dressType, fabricType,typeName } from "../controllers/lookups/lookup.controller";

const router = Router();

    router.get('/lookup/units', units);
    router.get('/lookup/relationship', relationship);
    router.get('/lookup/card-status', cardStatus);
    router.get('/lookup/dress-type', dressType);
    router.get('/lookup/fabric-type', fabricType);
    router.get('/lookup/type-name', typeName);

export default router;