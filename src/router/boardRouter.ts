import { Router } from "express";

import { boardController } from "../controller";

const router: Router = Router();

router.get("/", boardController.getBoard);
router.get("/:boardId/pins", boardController.getBoardPins);
router.get("/:boardId/notes", boardController.getBoardNotes);
router.post("/:boardId/notes", boardController.createBoardNote);
router.put("/:boardId/notes/:noteId", boardController.updateBoardNote);

export default router;
