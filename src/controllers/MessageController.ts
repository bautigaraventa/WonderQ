import { Request, Response } from "express";
import { messageRepository } from "../repository/MessageRepository";
import { MessageModel } from "../models/MessageModel";
import { messageService } from "../services/MessageService";

/**
 * Message Controller to manage everything related to a Message
 */
export class MessageController {

    //#region Methods

    /**
     * Returns all available Messages to process
     * @param req 
     * @param res 
     */
    public receive = (req: Request, res: Response) => {
        try {
            const allMessages: MessageModel[] = messageRepository.getAll();
            const filteredMessages: MessageModel[] = allMessages.filter((m) => !m.isBeingProcessed);

            if (filteredMessages.length) {
                filteredMessages.forEach(fm => {
                    messageService.setMessageProcessingTimeout(fm.id);
                    messageRepository.update(fm.id, { isBeingProcessed: true });
                });
            }

            res.status(200).send({
                messages: filteredMessages
            });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    /**
     * Creates, stores and returns a Message to be processed by a Consumer
     * @param req 
     * @param res 
     */
    public send = (req: Request, res: Response) => {
        try {
            const messageCreated: MessageModel = messageRepository.create(req.body);

            res.status(200).send({
                id: messageCreated.id,
            })
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    /**
     * Deletes a successfully processed Message 
     * @param req 
     * @param res 
     */
    public markAsProcessed = (req: Request, res: Response) => {
        try {
            const messageToDelete = messageRepository.getOne(req.params.messageId);
            if (!messageToDelete.isBeingProcessed) {
                throw new Error(`The message time to process has expired`);
            }

            messageRepository.delete(req.params.messageId);
            res.status(200).send({
                message: req.params.messageId,
            })
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    //#endregion

}

export const messageController = new MessageController();