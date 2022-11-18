import { Request, Response } from "express";
import { pinService } from "../service";

//* 모든 핀 조회
const getManyPins = async (req: Request, res: Response) => {
    const pins = await pinService.getManyPins();
    const data = {
        pins: pins
    }
    return res.status(200).json({ status: 200, message: "핀 전체 조회 성공", data});
}

const pinController = {
    getManyPins,
};

export default pinController;