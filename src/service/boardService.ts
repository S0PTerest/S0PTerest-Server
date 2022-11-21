import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBoard = async (userId: string) => {
  const board = await prisma.board.findMany({
    where: {
      userId: userId,
    },
  });

  return board;
};

const getBoardPin = async (boardId: string) => {
  const pin = await prisma.boardPin.findMany({
    where: {
      boardId: boardId,
    },
    include: {
      pin: true,
    },
  });

  return pin;
};

const getBoardNotes = async (boardId: string) => {
  const notes = await prisma.note.findMany({
    where: {
      boardId: boardId,
    },
    select: {
      uid: true,
      title: true,
      description: true,
      date: true,
      pins: {
        include: {
          pin: true,
        },
      },
    },
  });
  const result = notes.map((note) => {
    return { ...note, pins: note.pins.map((pin) => pin.pin) };
  });

  return result;
};

const boardService = {
  getBoard,
  getBoardPin,
  getBoardNotes,
};

export default boardService;
