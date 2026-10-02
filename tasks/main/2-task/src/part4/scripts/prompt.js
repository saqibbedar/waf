// prompt script
import prompt from "prompt";
import validator from "validator";
import chalk from "chalk";

// init prompt stream config
prompt.start();

const obj = await prompt.get(['name']);

const { name } = obj;

if (!name) {
    console.log(chalk.red.bold("Name cannot be empty. Try again!"));
}

if (validator.isUppercase(name[0]) && validator.isAlpha(name)) {
    console.log(chalk.green.bold(name));
} else {
    console.log(chalk.red.bold.red(name));
}