# WonderQ

WonderQ is a broker that allows producers to write to it, and consumers to read from it.

It's a REST API developed in node.js with typescript.


# To start the project
    - npm install
    - set .env file (see section below)
    - npm run dev
    - start enjoying!


# .env example
    - PORT=3000 => the port where our server will listen to requests
    - MESSAGE_PROCESSING_TIME_MS=5000 => miliseconds to define the maximun time a message can be processed by a Consumer

# Tests
As a testing library we use jest (https://jestjs.io/):

    - npm test

# Our base model is MessageModel
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

## GET - serverUrl/messages
This endpoint returns all the available messages for a Consumer to process them.
After receiving messages, they will have a configured time to be processed. Otherwise they will go back to the list of unprocessed messages.

Input:
    - query:
        - qty: (optional) max number of messages we want to receive.

Output:
    - successful:
        - { status: 200, messages: MessageModel[] }
    - error:
        - { status: 500, error }


## POST - serverUrl/messages
This endpoint creates, stores and returns a Message to be processed by a Consumer in the future.

### Input:
    - body:
        - message: String The exact message,
        - payload: (optional) Any Additional information of the message,

### Output:
    - successful:
        - { status: 200, id: string }
    - error: 
        - { status: 500, error }


## PUT - serverUrl/messages/:messageId/
This endpoint deletes a successfully processed Message.
The system will validate if the message is being processed. Otherwise it will throw an error because the time of process has expired.

### Input:
    - params:
        - messageId: String The unique identifier of the message to delete. 

### Output:
    - successful:
        - { status: 200, id: string }
    - error: 
        - { status: 500, error }


# Thinking big
There are many things that can be added to this project if we think about a production environment:

First of all, we would need a persistance storage. Nowadays, we are saving the data in memory. I would recommend to use a non relational database (MongoDB), because it would be a very simple modeling structure with no relations on it. I would use mongoose as a library to work with Mongo.

After that, I would develop some sort of authentication to allow only defined users to access our services and let each user have their own messages. We could develop the standard openId with a clientId and clientSecret.
