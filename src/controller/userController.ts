import { Request, Response } from "express";
import { userService } from "../service";

const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    if(!user) {
        return res.status(404).json({ status: 404, message: "NOT_FOUND"});
    }

    const follower = await userService.countFollowerById(userId);
    const following = await userService.countFollowingById(userId);

    const data = {
        user: {
            ...user,
            follower,
            following    
        }
    }

    return res.status(200).json({ status: 200, message: "유저 조회 성공", data});
    };

const userController = {
    getUserById
}

export default userController;