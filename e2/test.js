import { grades } from "./grades.js";
import { averageBy, topN, coursesOf, failing, makeIdGenerator } from "./stats.js";

console.log(averageBy(grades, "course"));
console.log(topN(grades, 2));
console.log(coursesOf(grades, "Era Leka"));
console.log(failing(grades));
console.log(failing(grades, { min: 6 }));

const orderId = makeIdGenerator("ORD");
const invoiceId = makeIdGenerator("INV", 41);
console.log(orderId(), orderId(), invoiceId(), orderId());
