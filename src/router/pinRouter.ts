import { Router } from "express";
import { pinController } from "../controller";

const router: Router = Router();

router.get('/', pinController.getManyPins);

export default router;