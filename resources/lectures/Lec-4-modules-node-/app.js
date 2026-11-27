import { add, PI, data, Car } from "./test.js";
import print from "./test.js";

const objCar = new Car("Honda", "2020");
objCar.output();

data.forEach((obj) => {
  console.log(obj.name);
});
// console.log(data.name);
console.log(PI);
console.log(add(110, 20));
console.log(print("Ali"));

// import { add, mul, PI, display, data, Car as MyCar } from "./test.js";
// // import MyCar from "./test.js";

// const carObj = new MyCar("Honda", "2020");
// carObj.print();

// console.log(add(10, 20));
// console.log(mul(10, 20));
// console.log(display("Ali"));
// console.log(PI);
// data.forEach((info) => {
//   console.log(info.name);
// });
// // console.log(obj.data);

// // import MyCar from "./test.js";
// // const car1 = new MyCar("Honda", "2015");
// // car1.display();
// // import { PI, add, print } from "./test.js";
// // console.log(add(10, 20));
// // console.log(print("Ali"));
// // console.log(PI);

// // import { data } from "./test.js";
// // console.log(data);
