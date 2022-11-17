import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getManyPins = async () => {
    const data = await prisma.pin.findMany();
    return data;
}

const pinService = {
    getManyPins,
};

export default pinService;