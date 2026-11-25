// E6 (Lectures 2 and 3): order report from nested JSON
import { writeFile, readFile } from "node:fs/promises";

export class NotFoundError extends Error {
  // TODO: name "NotFoundError", status 404
}

// 1. total of one order: destructure { items } in the parameter, use reduce
//    orderTotal(orders[0]) -> 52.3
export const orderTotal = ({ items }) => {};

// 2. one line per order that is NOT cancelled
//    "#3 Era Leka (Tirana) [VIP]: 80.00 EUR"
//    hint: ({ id, customer: { name, city, vip }, ...order }) => ...
export const summary = (orders) => {};

// 3. best sellers (not cancelled): flatMap the items, count qty per sku in a Map,
//    highest first -> [ [ 'TS-303', 4 ], [ 'BK-101', 3 ], [ 'MG-202', 2 ] ]
export function bestSellers(orders) {}

// 4. number of orders per city with Object.groupBy -> { Tirana: 2, Durres: 1, Vlore: 1 }
export const ordersByCity = (orders) => {};

// 5. return a NEW array where order `id` has status "shipped";
//    the original array and objects must not change (use map + spread)
export const markShipped = (orders, id) => {};

// 6. return the order, or throw new NotFoundError("Order 99 not found")
export function findOrder(orders, id) {}

// 7. save as JSON (2-space indent); load it back with a reviver
//    that turns every "date" value into a Date object
export async function saveOrders(orders, file) {}
export async function loadOrders(file) {}
