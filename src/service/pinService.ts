import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getManyPins = async () => {
    const data = await prisma.pin.findMany({
        select: {
            uid: true,
            title: true,
            creator: true,
            imageUrl: true,
        },
    });
    return data;
};

const pinService = {
    getManyPins,
};

export default pinService;
