# LLaMA.cpp Chatbot Restful API

*This was created using [alpaca api](https://github.com/adamtheadmin/alpaca-chatbot-api) as a base.*

This is a chatbot request queue, and restful API for accessing the LLaMA.cpp repo. 
This is designed to work with [llama.cpp](https://github.com/ggerganov/llama.cpp)

Features:
 - Prompt Queue
 - Restful API
 - Socket.io API

### Config File Variables
 - llama_path: The file path to the main executable of the Llama chatbot application.
 - model_path: The file path to the pre-trained model used by the Llama chatbot.
 - llama_params: A list of command line arguments and their values for configuring the LLaMA chatbot. These will be passed into the command line arguments into the chatbot.
 - port: The port number on which the API service will listen for incoming requests, set to "8080".
### Run
- Install Typescript
- `npm i`
- `cp config.example.json config.example.json`
- `nano config.json` Enter proper details into config.json file
- `ts-node index.ts`

### Install
- Install Typescript
- `npm i`
- `cp config.example.json config.example.json`
- `nano config.json`
- `npm run build`
- Install as a service, the run command would be `node index.js`. Be sure to have all the proper config values set.

### API Usage
To use the API, send a POST request to `/chat` with a payload that has a field named `prompt` that is a string value.

    {"prompt": "How old was george washington when he died?"}

You should get a response that looks like this:

    {"response":"George Washington was 67 years old when he died on December 14, 1799."}

### Socket.io Usage

To use this with websockets, you should emit a `chat` event to the websocket server 
with a `prompt` and an `id`. The `id` field will be returned later with responses.

    socket.emit("chat", { prompt: input, id: 'remember me' });

To get the chunks of the response, write some code that looks like this

```
socket.on("response", ({chunk, id}) => {
    ...
});
```
When the server is done sending the response, you will get an `endResponse` event with the `id` that was originally sent in.
```
socket.on("endResponse", ({id}) => {
    ...
});
```

### Licence

Copyright 2023 Adam Fowler

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
