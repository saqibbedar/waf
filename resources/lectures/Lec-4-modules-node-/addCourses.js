import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const courses = [];

function Menu() {
  console.log("1. Add Course\n2.View Courses\n3. Exit\n\n");

  rl.question("Enter a choice:", (choice) => {
    if (choice == 1) {
      rl.question("Enter course title: ", (course) => {
        courses.push(course);
        Menu();
      });
    } else if (choice == 2) {
      courses.forEach((item) => {
        console.log(item);
      });
      Menu();
    } else if (choice == 3) {
      console.log("Thank you..");
      rl.close();
    } else {
      console.log("Invalid Option. Enter again...");
      Menu();
    }
  });
}

Menu();
