import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* userId로 유저 조회
const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
    where: {
        uid: userId,
    },
    });

    return user;
};

const countFollowerById = async (userId: string) => {
    const follower = await prisma.userRelation.count({
        where: {
            followerId : userId,
        },
    });
    
    return follower;
}

const countFollowingById = async (userId: string) => {
    const following = await prisma.userRelation.count({
        where: {
            followingId: userId,
        }
    });

    return following;
}

const userService = {
    getUserById,
    countFollowerById,
    countFollowingById
};

export default userService;