import chalk from "chalk";
import colors from "colors";
import validator from "validator";
import prompt from "prompt";

prompt.start();
console.log(`Enter username and password\n`);
const obj = await prompt.get(["name", "pwd"]);
console.log("The username is " + obj.name + " and the password is " + obj.pwd);

//   .then((data) => {
//     console.log(
//       "The username is " + data.name + " and the password is " + data.pwd,
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// , (err, data) => {
//   if (!err) {
//     console.log(
//       "The username is " + data.name + "and the password is " + data.pwd,
//     );
//   } else {
//     console.log(err);
//   }
// });

// const url = "abcasdda";

// console.log(validator.contains(url, "zd"));
