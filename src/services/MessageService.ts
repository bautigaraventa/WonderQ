import { messageRepository } from "../repository/MessageRepository";

/**
 * Message Service to manage extra functionalities
 */
export class MessageService {

    //#region Properties

    private messageProcessingTimeMs: number;

    //#endregion

    //#region Constructor

    constructor() {
        this.messageProcessingTimeMs = Number(process.env.MESSAGE_PROCESSING_TIME_MS);
    }

    //#endregion

    //#region Methods

    /**
     * Sets a timer to run after a defined time 
     * @param id Unique id to identify the Message set the timer
     */
    public setMessageProcessingTimeout = (id: string) => {
        setTimeout(() => {
            const messageToUpdate = messageRepository.getOne(id);
            if (messageToUpdate?.isBeingProcessed) {
                messageRepository.update(id, { isBeingProcessed: false })
            }
        }, this.messageProcessingTimeMs);
    }

    //#endregion

}

export const messageService = new MessageService();
