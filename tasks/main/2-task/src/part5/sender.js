// Sender (send messages)
// You can directly try the browser

import path from "path";
import fs from "fs";
import prompt from "prompt";
import chalk from "chalk";

import { ROOT_DIR } from "../../config/index.js";

const chatHistoryFilePath = path.join(ROOT_DIR, "logs/chat/history.txt");

// init prompt
prompt.start();

try {
  const { receiverIP, message } = await prompt.get(["receiverIP", "message"]);

  if (!receiverIP || !message) {
    console.log(chalk.red("Receiver IP and message cannot be empty."));
  }

  console.log(chalk.gray(`Sending message to ${receiverIP}`));

  const url = `http://${receiverIP}:8080/?message=${encodeURIComponent(message)}`;
  const response = await fetch(url);
  const replyText = await response.text();

  console.log(chalk.green(`\n[Delivered] Server replied: ${replyText}`));

  // prepare log info
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  const formattedSentLog = `[${date} ${time}] [Sent to ${receiverIP}]: ${message}`;

  await fs.promises.appendFile(chatHistoryFilePath, `${formattedSentLog}\n`);
} catch (error) {
  console.log(chalk.red(`[Failed to Send]: ${error.message}`));
}
