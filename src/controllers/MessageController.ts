import { Request, Response } from "express";

export class MessageController {

    public receive(req: Request, res: Response) {
        res.status(200).send({
            message: "RECEIVE"
        });
    }

    public send(req: Request, res: Response) {
        res.status(200).send({
            message: 'SEND'
        })
    }

    public markAsProcessed(req: Request, res: Response) {
        res.status(200).send({
            message: 'PROCESSED'
        })
    }

}

export const messageController = new MessageController();