import { Request, Response } from "express";
import { boardService } from "../service";

const getBoard = async (req: Request, res: Response) => {
  const userId = "920e9467-c4aa-4359-974f-9310eb9b0a6a";
  const board = await boardService.getBoard(userId);

  if (!board) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }

  const data = {
    board: {
      ...board,
    },
  };

  return res.status(200).json({ status: 200, message: "보드 조회 성공", data });
};

const getBoardPins = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const pin = await boardService.getBoardPin(boardId);

  if (!pin) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }

  const data = {
    pin,
  };

  return res
    .status(200)
    .json({ status: 200, message: "보드에 속한 핀 조회 성공", data });
};

const boardController = {
  getBoard,
  getBoardPins,
};

export default boardController;
