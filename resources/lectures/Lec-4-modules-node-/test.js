export class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }
  output() {
    console.log(`Model: ${this.model}\nYear: ${this.year}`);
  }
}
export default function display(name) {
  return name;
}

export const PI = 3.14;

export function add(x, y) {
  return x + y;
}

export const data = [
  {
    name: "Umer",
    id: 3,
  },
  { name: "xyz", id: 4 },
  { name: "abc", id: 5 },
];

// export class Car {
//   constructor(model, year) {
//     this.model = model;
//     this.year = year;
//   }
//   print() {
//     console.log(`${this.model}-${this.year}`);
//   }
// }
// export const PI = 3.14;

// export function display(name) {
//   return name;
// }

// export function add(a, b) {
//   return a + b;
// }

// export function mul(a, b) {
//   return a * b;
// }

// export const data = [
//   { name: "abc", exp: 30 },
//   { name: "xyz", exp: 10 },
// ];

// // export default class Car {
// //   constructor(model, year) {
// //     this.model = model;
// //     this.year = year;
// //   }

// //   display() {
// //     console.log(`Model: ${this.model}\n`);
// //     console.log(`Model: ${this.year}\n`);
// //   }
// // }

// // export function print(name) {
// //   return name;
// // }
// // export const PI = 3.14;

// // export function add(a, b) {
// //   return a + b;
// // }
// // export const data = [
// //   {
// //     name: "xyz",
// //     age: 20,
// //   },
// //   { name: "abc", age: 21 },
// //   { name: "W", age: 23 },
// // ];
// //
