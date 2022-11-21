import { Router } from "express";

import { boardController } from "../controller";

const router: Router = Router();

router.get("/", boardController.getBoard);
router.get("/:boardId/pins", boardController.getBoardPins);

export default router;
