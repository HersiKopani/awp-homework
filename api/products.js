// API exercise: integrate a real API
// Open this URL in your browser first and read the JSON:
export const API_URL = process.env.API_URL ?? "https://dummyjson.com/products?limit=10";

// 1. Fetch the data
export async function getProducts(url = API_URL) {
  // TODO: fetch(url); if !res.ok throw new Error(`HTTP ${res.status}`)
  //       return the "products" array from the JSON
}

// 2. List all product titles and prices
export const listTitlesAndPrices = (products) => {
  // TODO: [ "Essence Mascara Lash Princess: 9.99", ... ]  (map + toFixed(2))
};

// 3. Average rating per category: reduce + grouping
export function averageRatingByCategory(products) {
  // TODO: { beauty: 3.75, fragrances: 3.83 }
  //       reduce into { category: { sum, count } }, then sum / count
}

// 4. Discounted price from price and discountPercentage
export const withDiscountedPrice = (products) => {
  // TODO: [{ title, price, discount: "10.48%", discountedPrice: 8.94 }, ...]
  //       discountedPrice = price * (1 - discountPercentage / 100), 2 decimals
};
