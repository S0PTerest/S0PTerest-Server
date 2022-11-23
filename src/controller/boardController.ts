import { Request, Response } from "express";
import { boardService } from "../service";

const getBoard = async (req: Request, res: Response) => {
  const userId = "920e9467-c4aa-4359-974f-9310eb9b0a6a";
  const board = await boardService.getBoard(userId);

  if (!board) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }

  const data = {
    board,
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

const dateParser = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth();
  const date = inputDate.getDate();
  const weekdayMatch = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdayMatch[inputDate.getDay()];
  const parsedDate =
    year + "년 " + month + "월 " + date + "일 " + "(" + weekday + ")";
  return parsedDate;
};

const getBoardNotes = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const notes = await boardService.getBoardNotes(boardId);
  for (let note of notes) {
    let noteDate = note.date;
    let parsedNoteDate = dateParser(noteDate);
    note.date = parsedNoteDate as any; // date라 할당할 수 없어서
  }

  const data = {
    notes,
  };

  return res.status(200).json({ status: 200, message: "노트 조회 성공", data });
};

const createBoardNote = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const { title, description, date, pinIds } = req.body;

  // boardId가 존재하는 uid인지 체크하고 404 반환해주기
  // pinIds에서 존재하는 uid인지 체크하고 404 반환해주기
  // date 형식 체크하기
  const note = await boardService.createBoardNote(
    boardId,
    title,
    description,
    date,
    pinIds
  );

  const data = {
    note: {
      ...req.body,
      uid: note.uid,
    },
  };

  return res.status(201).json({ status: 201, message: "노트 생성 성공", data });
};

const updateBoardNote = async (req: Request, res: Response) => {
  const { boardId, noteId } = req.params;
  const { title, description, date, pinIds } = req.body;
  const note = await boardService.updateBoardNote(
    noteId,
    boardId,
    title,
    description,
    date,
    pinIds
  );

  const data = {
    note: {
      ...req.body,
      uid: note.uid,
    },
  };

  return res.status(200).json({ status: 200, message: "노트 수정 성공", data });
};

const boardController = {
  getBoard,
  getBoardPins,
  getBoardNotes,
  createBoardNote,
  updateBoardNote,
};

export default boardController;
