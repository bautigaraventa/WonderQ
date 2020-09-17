import * as express from "express";
import { messageController } from "../controllers/MessageController";
import { messageValidator } from '../validators/MessageValidators';

class MessageRoutes {
    private baseUrl = '/messages';
    public router: express.Router = express.Router();

    constructor() {
        this.init();
    }

    private init(): void {

        // comment later
        this.router.get(
            `${this.baseUrl}`,
            messageValidator.receive,
            (req: express.Request, res: express.Response) => messageController.receive(req, res)
        )

        // comment later
        this.router.post(
            `${this.baseUrl}`,
            messageValidator.send,
            (req: express.Request, res: express.Response) => messageController.send(req, res));

        // comment later
        this.router.put(
            `${this.baseUrl}/:messageId/`,
            messageValidator.markAsProcessed,
            (req: express.Request, res: express.Response) => messageController.markAsProcessed(req, res));
    }
}

export const messageRoutes = new MessageRoutes().router;