// A fake API: no network needed. Do not change this file.
const users = {
  1: { id: 1, name: "Ana Hoxha" },
  2: { id: 2, name: "Ben Kola" },
  3: { id: 3, name: "Era Leka" },
};
const orders = {
  1: [{ sku: "BK-101", name: "Eloquent JavaScript", price: 32.5, qty: 1 }],
  2: [{ sku: "MG-202", name: "Node.js mug", price: 9.9, qty: 3 }],
  3: [
    { sku: "BK-101", name: "Eloquent JavaScript", price: 32.5, qty: 2 },
    { sku: "MG-202", name: "Node.js mug", price: 9.9, qty: 1 },
  ],
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let calls3 = 0;

export async function getUser(id) {
  await wait(100);
  if (id === 3 && ++calls3 % 2 === 1) throw new Error("503 Service Unavailable (user 3)");
  if (!users[id]) throw new Error(`404 User ${id} not found`);
  return users[id];
}

export async function getOrders(userId) {
  await wait(150);
  return orders[userId] ?? [];
}

export async function getSlowReport() {
  await wait(2000);
  return "report";
}
