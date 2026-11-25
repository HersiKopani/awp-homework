import { ValidationError } from "./errors.js";

export class Product {
  // TODO 1: private #price
  // TODO 2: constructor(sku, name, price)
  //         SKU format "BK-101" (/^[A-Z]{2}-\d{3}$/) else ValidationError
  // TODO 3: getter and setter for price: a number > 0 else ValidationError
  // TODO 4: toJSON() -> { sku, name, price }
  // TODO 5: toString() -> "Eloquent JavaScript (32.50 EUR)"
}
