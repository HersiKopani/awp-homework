// E5 (Lectures 1 and 4): product catalogue in the browser
const API_URL = window.API_URL ?? "https://dummyjson.com/products?limit=10";

const $ = (id) => document.getElementById(id);
let products = [];

// 1. load(): show "Loading..." in #status, then fetch API_URL
//    with a 5 s timeout: fetch(API_URL, { signal: AbortSignal.timeout(5000) })
//    if !res.ok throw new Error(`HTTP ${res.status}`)
//    save the products array, then fillCategories() and render()
//    on error: #status = "Could not load products: HTTP 500", class "error"
async function load() {
  // TODO
}

// 2. fillCategories(): add one <option> per category to #category
//    unique and sorted: [...new Set(...)].toSorted(); new Option(text, value)
function fillCategories() {
  // TODO
}

// 3. visible(): the products to show, WITHOUT changing `products`
//    - #category: keep only that category (empty = all)
//    - #search: title contains the text (ignore upper/lower case)
//    - #sort: "price-asc" / "price-desc" with toSorted
function visible() {
  // TODO
}

// 4. render(): #status = "2 of 10 products" (or "No products found")
//    one <li> per product: "Red Lipstick - 12.99 - rating 4.36"
//    use document.createElement + textContent (not innerHTML)
//    and $("list").replaceChildren(...items)
function render() {
  // TODO
}

for (const id of ["search", "category", "sort"]) $(id).addEventListener("input", render);
load();
