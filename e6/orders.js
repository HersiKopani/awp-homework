// given data: do not change
export const orders = [
  { id: 1, date: "2026-11-02", status: "delivered",
    customer: { name: "Ana Hoxha", city: "Tirana" },
    items: [
      { sku: "BK-101", title: "Eloquent JavaScript", price: 32.5, qty: 1 },
      { sku: "MG-202", title: "Node.js mug", price: 9.9, qty: 2 },
    ] },
  { id: 2, date: "2026-11-05", status: "cancelled",
    customer: { name: "Ben Kola", city: "Durres" },
    items: [{ sku: "MG-202", title: "Node.js mug", price: 9.9, qty: 1 }] },
  { id: 3, date: "2026-11-09", status: "delivered",
    customer: { name: "Era Leka", city: "Tirana", vip: true },
    items: [
      { sku: "BK-101", title: "Eloquent JavaScript", price: 32.5, qty: 2 },
      { sku: "TS-303", title: "JavaScript T-shirt", price: 15, qty: 1 },
    ] },
  { id: 4, date: "2026-11-12", status: "pending",
    customer: { name: "Dea Muka", city: "Vlore" },
    items: [{ sku: "TS-303", title: "JavaScript T-shirt", price: 15, qty: 3 }] },
];
