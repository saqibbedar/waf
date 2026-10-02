// Node script for part 4.4
import fs from "fs";
import path from "path";

import prompt from "prompt";
import validator from "validator";
import chalk from "chalk";

import { ROOT_DIR } from "../../../config/index.js";

// prepare IP Address File paths
const WHITE_IP_FILE = path.join(ROOT_DIR, "logs/ipAddress/White.txt");
const BLACK_IP_FILE = path.join(ROOT_DIR, "logs/ipAddress/Black.txt");
const PENDING_IP_FILE = path.join(ROOT_DIR, "logs/ipAddress/Pending.txt");

function getNetworkAddress(ip) {
  const octets = ip.split(".").map(Number);
  const first = octets[0];
  if (first >= 1 && first <= 126) return `${octets[0]}.0.0.0`;
  if (first >= 128 && first <= 191) return `${octets[0]}.${octets[1]}.0.0`;
  if (first >= 192 && first <= 223)
    return `${octets[0]}.${octets[1]}.${octets[2]}.0`;
  return ip;
}

// init prompt stream config
prompt.start();

prompt.get(["email", "ipAddress"], async (err, result) => {
  if (err) return onErr(err);

  const { email, ipAddress } = result;
  
  // 4.4.1 Validation 
  if (!validator.isEmail(email) || !validator.isIP(ipAddress, 4)) {
    console.log(chalk.red.bold("\nInvalid email or IPv4 address format."));
    return;
  }

  // 4.4.2 Read files (black and white ips)
  const whiteIPs = await fs.promises.readFile(WHITE_IP_FILE, "utf-8").catch(() => "");
  const blackIPs = await fs.promises.readFile(BLACK_IP_FILE, "utf-8").catch(() => "");

  const whiteIPList = whiteIPs.split("\n");
  const blackIPList = blackIPs.split("\n");

  // 4.4.3 If the user-given IP matches an IP in the “Black.txt” list, generate an error communicating that the IP is blocked. 
  if (blackIPList.includes(ipAddress)) {
    console.log(chalk.red.bold(`\nIP address ${ipAddress} is blocked!`));
    return;
  }

  // 4.4.4 If the user-given IP matches an IP in the “White.txt” list, generate an authentication success message. 
  if(whiteIPList.includes(ipAddress)) {
    console.log(chalk.green.bold(`\nIP address ${ipAddress} authenticated successfully!`));
    return;
  }

  // 4.4.5 Network Address Check
  const user_network = getNetworkAddress(ipAddress);
  const white_ip_networks = whiteIPList.map(ip => getNetworkAddress(ip));

  if (white_ip_networks.includes(user_network)) {
    console.log(chalk.yellow.bold(`\nIP address belongs to a network user ${user_network} and he is authorized. Contact the administrator.`));
    return;
  }

  // 4.4.6 Pending 
  await fs.promises.appendFile(PENDING_IP_FILE, `${ipAddress}\n`);
  console.log(chalk.red.bold(`\nSystem is unable to authenticate IP ${ipAddress}. Added to ${PENDING_IP_FILE} file.`));

});

function onErr(err) {
  console.log(err);
  return 1;
}
