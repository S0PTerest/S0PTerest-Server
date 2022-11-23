import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBoard = async (userId: string) => {
  const board = await prisma.board.findMany({
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

const boardService = {
  getBoard,
  getBoardPin,
};

export default boardService;
