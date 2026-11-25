import { getProducts, listTitlesAndPrices, averageRatingByCategory, withDiscountedPrice } from "./products.js";

try {
  const products = await getProducts();
  console.log(`${products.length} products\n`);

  console.log("1. Titles and prices");
  listTitlesAndPrices(products).forEach((line) => console.log("  " + line));

  console.log("\n2. Average rating per category");
  console.log(averageRatingByCategory(products));

  console.log("\n3. Discounted prices");
  for (const p of withDiscountedPrice(products)) {
    console.log(`  ${p.title}: ${p.price} -${p.discount} = ${p.discountedPrice}`);
  }
} catch (err) {
  console.error("Could not load products:", err.message);
  process.exitCode = 1;
}
