import express from 'express';
import {Server} from 'socket.io';
import chat from './chat';
import * as Buffer from "buffer";
import bodyParser from "body-parser";
import cors from 'cors';
import config from './config.json';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.post('/chat', async (req: express.Request, res: express.Response) => {
    const {prompt} = req.body;

    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({message: "Invalid Prompt!"});
    }

    const response = await chat.asyncAsk(prompt);
    res.json({response});
});

const server = app.listen(config.port, () => console.log(`Chatbot Listening on port ${config.port}`));

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('chat', ({prompt, id}) => {
        if (typeof prompt != 'string') {
            return socket.emit('error', `Invalid Prompt Type: ${typeof prompt}`);
        }

        const chatstream = chat.ask(prompt);

        chatstream.on('data', (chunk: Buffer) => {
           socket.emit('response', {
               chunk: chunk.toString(),
               id
           });
        });

        chatstream.on('end', () => {
            socket.emit('endResponse', {
                id
            });
        });
    });
});
