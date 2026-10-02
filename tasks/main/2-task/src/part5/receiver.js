// receiver (receive messages)

import http from "http";
import path from "path";
import fs from "fs";
import chalk from "chalk";


import { ROOT_DIR } from "../../config/index.js";

const chatHistoryFilePath = path.join(ROOT_DIR, "logs/chat/history.txt");

const PORT = 8080;
const ORIGIN = "0.0.0.0";

const server = http.createServer(async (req, res) => {
    if (req.url.startsWith("/favicon.ico")) {
        return;
    };

    // 1. parse url
    const reqURL = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = reqURL.searchParams;

    // 2. read the message
    const message = searchParams.get("message");
    if(!message) {
        res.end("Error: No message provided. Use: /?message=your_message");
    }

    // 3. timestamps and sender info
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const senderIP = req.socket.remoteAddress;

    console.log(chalk.blue(`\n[${time}] [From ${senderIP}]: ${chalk.bold(message)}`));

    const formattedLog = `[${date} ${time}] [Received from ${senderIP}]: ${message}`;

    await fs.promises.appendFile(chatHistoryFilePath, `${formattedLog}\n`);

    res.end("Message received!");
});

server.listen(PORT, ORIGIN, () => {
    console.log(chalk.green(`\nChat Receiver is listening on http://${ORIGIN}:${PORT}`));
    console.log(`Waiting for incoming message...\n`);
});