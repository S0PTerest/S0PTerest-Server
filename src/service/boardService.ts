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
        select: {
          pin: {
            select: {
              uid: true,
              title: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  const result = notes.map((note) => {
    return { ...note, pins: note.pins.map((pin) => pin.pin) };
  });

  return result;
};

const createBoardNote = async (
  boardId: string,
  title: string,
  description: string,
  date: string,
  pinIds: string[]
) => {
  const parsedDate = new Date(date);

  const pinCreateList = pinIds.map((uid) => {
    return {
      pin: { connect: { uid: uid } },
    };
  });

  const note = await prisma.note.create({
    data: {
      boardId: boardId,
      title: title,
      description: description,
      date: parsedDate,
      pins: {
        create: pinCreateList,
      },
    },
  });

  return note;
};

const updateBoardNote = async (
  noteId: string,
  boardId: string,
  title: string,
  description: string,
  date: string,
  pinIds: string[]
) => {
  const parsedDate = new Date(date);

  const pinCreateList = pinIds.map((uid) => {
    return {
      pin: { connect: { uid: uid } },
    };
  });

  // TODO 기존에 note와 pin 연결 삭제
  const del = await prisma.notePin.deleteMany({
    where: {
      noteId: noteId,
    },
  });

  const note = await prisma.note.update({
    where: {
      uid: noteId,
    },
    data: {
      boardId: boardId,
      title: title,
      description: description,
      date: parsedDate,
      pins: {
        create: pinCreateList,
      },
    },
  });

  return note;
};

const boardService = {
  getBoard,
  getBoardPin,
  getBoardNotes,
  createBoardNote,
  updateBoardNote,
};

export default boardService;
