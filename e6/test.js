import { orders } from "./orders.js";
import { orderTotal, summary, bestSellers, ordersByCity, markShipped, findOrder, saveOrders, loadOrders } from "./report.js";

console.log(orderTotal(orders[0]));
console.log(summary(orders));
console.log(bestSellers(orders));
console.log(ordersByCity(orders));

const updated = markShipped(orders, 4);
console.log(updated[3].status, orders[3].status, updated[0] === orders[0]);

try { findOrder(orders, 99); } catch (err) { console.log(err.status, err.name, err.message); }

await saveOrders(orders, "data/orders.json");
const loaded = await loadOrders("data/orders.json");
console.log(loaded[0].date instanceof Date, loaded[0].date.toLocaleDateString("en-GB", { day: "numeric", month: "long" }));
