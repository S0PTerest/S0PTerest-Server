import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBoard = async (userId: string) => {
  const boards = await prisma.board.findMany({
    where: {
      userId: userId,
    },
    select: {
      uid: true,
      userId: true,
      title: true,
      pins: {
        select: {
          pin: {
            select: {
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  const result = boards.map((board) => {
    return { ...board, pins: board.pins.map((pin) => pin.pin) };
  });

  return result;
};

const getBoardPin = async (boardId: string) => {
  const pins = await prisma.pin.findMany({
    where: {
      boards: {
        some: {
          boardId: boardId,
        },
      },
    },
    select: {
      uid: true,
      title: true,
      imageUrl: true,
      creator: {
        select: {
          uid: true,
          name: true,
          email: true,
          profileImageUrl: true,
        },
      },
    },
  });

  return pins;
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

const getBoardById = async (boardId: string) => {
  const board = prisma.board.findUnique({
    where: {
      uid: boardId,
    },
  });
  return board;
};

const getNotedById = async (noteId: string) => {
  const note = prisma.note.findUnique({
    where: {
      uid: noteId,
    },
  });
  return note;
};

const getValidPinCount = async (boardId: string, pinIds: string[]) => {
  const ValidPinCount = prisma.pin.count({
    where: {
      uid: {
        in: pinIds,
      },
      boards: {
        some: {
          boardId: boardId,
        },
      },
    },
  });

  return ValidPinCount;
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
  getBoardById,
  getNotedById,
  getValidPinCount,
  updateBoardNote,
};

export default boardService;
