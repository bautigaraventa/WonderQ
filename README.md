# WonderQ

WonderQ is a broker that allows producers to write to it, and consumers to read from it.

It's a REST API developed in node.js with typescript.


# To start the project:
    - npm install
    - set .env file (see section below)
    - npm run dev
    - start enjoying!


# .env example:
    - PORT=3000 => the port where our server will listen to requests
    - MESSAGE_PROCESSING_TIME_MS=5000 => miliseconds to define the maximun time a message can be processed by a Consumer

# Our base model is MessageModel:
```
{
    id: string,
    message: string,
    payload: any,
    isBeingProcessed: boolean,
}
```

# Services
There are 3 services (endpoints) available:

GET - serverUrl/messages
This endpoint returns all the available messages for a Consumer to process them.
After receiving messages, they will have a configured time to be processed. Otherwise they will go back to the list of unprocessed messages.

Input:
    - query:
        - qty: (optional) max number of messages we want to receive.

Output:
    - successfull:
        - { status: 200, messages: MessageModel[] }
    - error:
        - { status: 500, error }


POST - serverUrl/messages
This endpoint creates, stores and returns a Message to be processed by a Consumer in the future.

Input:
    - body:
        - message: String The exact message,
        - payload: (optional) Any Additional information of the message,

Output:
    - successfull:
        - { status: 200, id: string }
    - error: 
        -{ status: 500, error }


PUT - serverUrl/messages/:messageId/
This endpoint deletes a successfully processed Message.
The system will validate if the message is being processed. Otherwise it will throw an error because the time of process has expired.

Input:
    - params:
        - messageId: String The unique identifier of the message to delete. 

Output:
    - successfull:
        - { status: 200, id: string }
    - error: 
        -{ status: 500, error }