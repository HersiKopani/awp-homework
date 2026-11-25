import { writeFile, readFile, mkdir } from "node:fs/promises";
import { Product } from "./product.js";
import { Cart } from "./cart.js";

const book = new Product("BK-101", "Eloquent JavaScript", 32.5);
const mug = new Product("MG-202", "Node.js mug", 9.9);

const cart = new Cart().add(book).add(mug, 2).add(mug);
console.log(cart.count, cart.total);
cart.applyDiscount("STUDENT10");
console.log(cart.total, String(book));

for (const bad of [
  () => new Product("book1", "Bad", 10),
  () => (mug.price = -3),
  () => cart.add(book, 0),
  () => cart.remove("XX-999"),
  () => cart.applyDiscount("FREE"),
]) {
  try { bad(); } catch (err) { console.log(err.status, err.name, err.message); }
}

await mkdir("data", { recursive: true });
await writeFile("data/cart.json", JSON.stringify(cart, null, 2));
const copy = Cart.fromJSON(JSON.parse(await readFile("data/cart.json", "utf8")));
console.log(copy.count, copy.total, copy instanceof Cart);
