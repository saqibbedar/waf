import EventEmitter from "events";

// emitter object
const emitter = new EventEmitter();

// tackers/counters
const countEvent = {
  sign: 0,
  order: 0,
  update: 0,
  logout: 0,
};

// setup listeners (attach listener)
// syntax: emitter.on(event-name, callback) OR emitter.addListener("name", cb);

// 1. sign
emitter.on("sign", (username) => {
  countEvent.sign++;
  console.log(`Event sign: User ${username}`);
});

// 2. order
emitter.on("order", ({ model, price, count }) => {
  countEvent.order++;
  console.log(`Event order: ${model} | ${price} | ${count}`);
});

// 3. update
emitter.on("update", ({ username, updated_username }) => {
  countEvent.update++;
  console.log(`Event update: old ${username} | newname ${updated_username}`);
});

// 4. logout
emitter.on("logout", (username) => {
  countEvent.logout++;
  console.log(`Event logout: ${username} logged out`);
});

// broadcasting (emitting)

// 1. sign
emitter.emit("sign", "saqib");
emitter.emit("sign", "bedar");

// 2. order
emitter.emit("order", { model: "Latitude", price: 1000, count: 2 });

// 3. update
emitter.emit("update", { username: "john_doe", updated_username: "johndoe" });

// 4. logout
emitter.emit("logout", "saqibbedar");
emitter.emit("logout", "ali");
emitter.emit("logout", "dur");

// Summary

console.log("\n================= Summary ==================");
for (let [k, v] of Object.entries(countEvent)) {
  console.log(`Event ${k}: ${v}`);
}
