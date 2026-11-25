import { Product } from "./product.js";
import { ValidationError, NotFoundError } from "./errors.js";

export class Cart {
  static DISCOUNTS = { STUDENT10: 0.1, BLACKFRIDAY: 0.25 };
  #items = new Map(); // sku -> { product, qty }
  #discount = 0;

  // TODO add(product, qty = 1): qty must be an integer >= 1,
  //      same product twice -> increase qty; return this (chainable)
  // TODO remove(sku): NotFoundError if missing; return this
  // TODO applyDiscount(code): ValidationError if unknown; return this
  // TODO get count: total quantity
  // TODO get total: sum of price * qty, minus discount, 2 decimals
  // TODO toJSON(): { items: [{ sku, name, price, qty }], discount }
  // TODO static fromJSON(data): rebuild a Cart with Product objects
}
