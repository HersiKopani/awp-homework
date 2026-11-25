# Advanced Web Programming – Homework: Lectures 1-4 + a real API

**Course:** Advanced Web Programming 
**Assistant lecturer:** Hersi Kopani 
**Academic year:** 2026-2027
Metropolitan University of Tirana - MSc Software Engineering

Seven exercises to complete at home. E1-E6 review Lectures 1-4; the **API** exercise connects your JavaScript to a real public API.

| # | Lecture | Exercise | Time | You write | Run |
|---|---|---|---|---|---|
| E1 | 1 HTTP | Parse an HTTP response  | `e1/http.js` | `npm run e1` |
| E2 | 2 Modern JS I | Grade statistics | `e2/stats.js` | `npm run e2` |
| E3 | 3 Modern JS II | A shopping cart | `e3/product.js`, `e3/cart.js` | `npm run e3` |
| E4 | 4 Async JS | Retry, timeout, parallel | `e4/async.js` | `npm run e4` |
| E5 | 1 + 4 | Product catalogue in the browser | `e5/app.js`, `e5/NOTES.md` | `npm run e5` |
| E6 | 2 + 3 | Order report from nested JSON | `e6/report.js` | `npm run e6` |
| API | 4 | Integrate DummyJSON | `api/products.js` | `npm run api` |

**Deadline:** the evening before the lab (time announced in class). The time of your pull request counts.

---

## How you are evaluated

| What | Points |
|---|---|
| Pull request opened before the deadline (even if not everything works) | 5 |
| In class: you explain your code, present a solution or answer a question | 5 |

These participation points count for **10%** of the final grade. In class, students are chosen **at random** to explain any line of their homework, so write code you understand. Stuck? Open the pull request anyway and write in the description where you are stuck and what you tried: it still counts.

## Rules

- Write the code yourself. You may use the course slides, MDN and the Node.js docs.
- Do **not** change the test files (`test.js`) or the given files (`grades.js`, `errors.js`, `e4/api.js`, `orders.js`, `index.html`, `serve.js`).
- Compare your output with the **expected output** below, character by character.
- Commit after **each** exercise, with a clear message.
- No `npm install` is needed: everything uses Node.js core only. E5 and the API exercise need internet.

---

## Setup (once)

You need **Node.js 22** or newer (`node -v`), Git and a GitHub account.

1. On GitHub, click **Fork** (top right of this page) to get your own copy.
2. Clone **your fork** and create your branch:

```bash
git clone https://github.com/HersiKopani/awp-homework.git
cd awp-homework
git checkout -b hw-<your-username>
node -v        # v22.x
npm run e1     # runs the E1 test (it fails until you write the code)
```

Repository layout:

```
awp-homework/
├── e1/  http.js*  test.js
├── e2/  stats.js*  grades.js  test.js
├── e3/  product.js*  cart.js*  errors.js  test.js
├── e4/  async.js*  api.js (fake API)  test.js
├── e5/  app.js*  NOTES.md*  index.html  serve.js
├── e6/  report.js*  orders.js  test.js
└── api/ products.js*  test.js            (* = you write this)
```

---

## E1 – Parse an HTTP response (Lecture 1)

File: `e1/http.js` • Run: `npm run e1`

An HTTP response is just text: a status line, headers, a blank line, and the body. Write:

1. `parseResponse(raw)` that returns `{ version, status, statusText, headers, body }`:
   - split head and body at the **first** `"\r\n\r\n"`;
   - status line → `version`, `status` (a **number**), `statusText`;
   - headers → an object with **lower-case** names and trimmed values. Split each header line at the **first** `":"` only (`https://...` also contains a colon);
   - if `content-type` contains `application/json`, `JSON.parse` the body.
2. `category(status)` → `"Informational"`, `"Success"`, `"Redirection"`, `"Client error"` or `"Server error"`.

Expected output:

```
200 OK | Success
  type: application/json | location: -
  body: { id: 1, title: 'Learn HTTP' }
301 Moved Permanently | Redirection
  type: - | location: https://umt.edu.al/
  body: 
404 Not Found | Client error
  type: text/plain | location: -
  body: No such page
```

## E2 – Grade statistics (Lecture 2)

File: `e2/stats.js` • Data: `e2/grades.js` • Run: `npm run e2` • **No `for` loops**: use array methods.

1. `averageBy(records, key)` – average grade per key with `reduce`, rounded to 2 decimals.
2. `topN(records, n = 3)` – the best students: reuse `averageBy`, then `toSorted`, `slice`, `map` → `"Era Leka (9.67)"`.
3. `coursesOf(records, student)` – the student's courses, unique and sorted (use a `Set`).
4. `failing(records, { min = 5 } = {})` – `"Student - Course"` for every grade `<= min`. Destructure inside the callbacks.
5. `makeIdGenerator(prefix, start = 1)` – a **closure**: returns a function that gives `"ORD-001"`, `"ORD-002"`, ...

Expected output:

```
{ AWP: 8.33, DB: 7.33, SE: 8.5 }
[ 'Era Leka (9.67)', 'Ana Hoxha (8.5)' ]
[ 'AWP', 'DB', 'SE' ]
[ 'Dea Muka - DB' ]
[ 'Ben Kola - AWP', 'Dea Muka - DB' ]
ORD-001 ORD-002 INV-041 ORD-003
```

## E3 – A shopping cart (Lecture 3)

Files: `e3/product.js`, `e3/cart.js` • Errors: `e3/errors.js` (given) • Run: `npm run e3`

**`Product`**
1. Constructor `(sku, name, price)`. The SKU must look like `"BK-101"` (`/^[A-Z]{2}-\d{3}$/`), otherwise throw `ValidationError("Invalid SKU: book1")`.
2. A **private** `#price` with a getter and a setter. The price must be a number `> 0`, otherwise `ValidationError("Invalid price: -3")`.
3. `toJSON()` → `{ sku, name, price }`; `toString()` → `"Eloquent JavaScript (32.50 EUR)"`.

**`Cart`** (the static `DISCOUNTS`, `#items` Map and `#discount` are given)
1. `add(product, qty = 1)` – `qty` must be an integer `>= 1` (`ValidationError("Invalid quantity: 0")`). Adding the same product again increases its quantity. Return `this` so calls can be chained.
2. `remove(sku)` – `NotFoundError("Not in cart: XX-999")` if it is not in the cart.
3. `applyDiscount(code)` – `ValidationError("Unknown code: FREE")` for an unknown code.
4. Getters `count` (total quantity) and `total` (price × qty, minus the discount, 2 decimals).
5. `toJSON()` → `{ items: [{ sku, name, price, qty }], discount }` and `static fromJSON(data)`.

Expected output:

```
4 62.2
55.98 Eloquent JavaScript (32.50 EUR)
400 ValidationError Invalid SKU: book1
400 ValidationError Invalid price: -3
400 ValidationError Invalid quantity: 0
404 NotFoundError Not in cart: XX-999
400 ValidationError Unknown code: FREE
4 55.98 true
```

## E4 – Retry, timeout and parallel requests (Lecture 4)

File: `e4/async.js` • Fake API: `e4/api.js` (given, no internet needed) • Run: `npm run e4`

In the fake API, **user 3** fails once with `503 Service Unavailable` and works the second time; **user 99** does not exist (`404`).

1. `withTimeout(promise, ms)` – reject with `Error("Timeout after 500 ms")` if the promise is slower. Hint: `Promise.race`; clear the timer when done.
2. `retry(fn, { times = 3, delay = 50 } = {})` – call `fn` up to `times` times, `sleep(delay)` between attempts, print `  attempt 1 failed: <message>, retrying`. **Never retry a 4xx error** (message starting with `"4"`): asking again will not make it exist.
3. `loadUser(id)` – the user (with `retry`) and the orders **in parallel** → `{ ...user, orders }`.
4. `loadDashboard(ids)` – `Promise.allSettled` → `{ users: [...], errors: [messages] }`.

Expected output:

```
sequential: 200 ms
parallel:   100 ms
Timeout after 500 ms
  attempt 1 failed: 503 Service Unavailable (user 3), retrying
[ 'Ana Hoxha: 1 order(s)', 'Era Leka: 2 order(s)' ]
[ '404 User 99 not found' ]
```

The program then waits about 2 more seconds before it ends. Be ready to explain why.

## E5 – Product catalogue in the browser (Lectures 1 and 4)

Files: `e5/app.js`, `e5/NOTES.md` • Given: `e5/index.html`, `e5/serve.js` • Run: `npm run e5`, then open http://localhost:5500

The same products as the API exercise, but now in the **browser** (Lecture 1: browser vs Node.js). The page has a search box `#search`, a category list `#category`, a sort list `#sort`, a status line `#status` and a list `#list`.

1. `load()` – show `Loading...`, fetch `https://dummyjson.com/products?limit=10` with a 5-second timeout (`AbortSignal.timeout(5000)`), check `res.ok`, keep the `products` array, then fill the categories and render. On error show `Could not load products: HTTP 500` with the class `error`.
2. `fillCategories()` – one `<option>` per category, unique and sorted (`Set`, `toSorted`, `new Option(text, value)`).
3. `visible()` – the products to show, **without changing** the original array: filter by category, by title (ignore upper/lower case), and sort by price (`toSorted`).
4. `render()` – `#status` shows `2 of 10 products` or `No products found`; one `<li>` per product, `Red Lipstick - 12.99 - rating 4.36`. Use `createElement` and `textContent`, **not** `innerHTML`.
5. **DevTools:** fill in the table in `e5/NOTES.md` from the **Network** tab.

Expected results in the browser:

```
start                           -> 10 of 10 products
search "red"                    -> 2 of 10 products
                                   Red Lipstick - 12.99 - rating 4.36
                                   Red Nail Polish - 8.99 - rating 4.32
fragrances, price high to low   -> 5 of 10 products
                                   Chanel Coco Noir Eau De - 129.99 - rating 4.26
                                   Dior J'adore - 89.99 - rating 3.8
                                   Gucci Bloom Eau de - 79.99 - rating 2.74
                                   Dolce Shine Eau de - 69.99 - rating 3.96
                                   Calvin Klein CK One - 49.99 - rating 4.37
search "zzz"                    -> No products found
```

## E6 – Order report from nested JSON (Lectures 2 and 3)

File: `e6/report.js` • Data: `e6/orders.js` (given: 4 orders with a nested `customer` and `items`) • Run: `npm run e6`

1. `orderTotal({ items })` – destructure in the parameter, `reduce` over `price * qty`.
2. `summary(orders)` – one line per order that is **not cancelled**: `"#3 Era Leka (Tirana) [VIP]: 80.00 EUR"`. Use nested destructuring: `({ id, customer: { name, city, vip }, ...order })`.
3. `bestSellers(orders)` – not cancelled: `flatMap` the items, count the quantity per SKU in a `Map`, highest first.
4. `ordersByCity(orders)` – number of orders per city with `Object.groupBy`.
5. `markShipped(orders, id)` – return a **new** array where that order has status `"shipped"`. The original must not change (`map` + spread).
6. `findOrder(orders, id)` – return the order, or throw `NotFoundError("Order 99 not found")` with `status` 404.
7. `saveOrders(orders, file)` / `loadOrders(file)` – save as JSON; load it back with a **reviver** that turns every `date` into a `Date` object.

Expected output:

```
52.3
[
  '#1 Ana Hoxha (Tirana): 52.30 EUR',
  '#3 Era Leka (Tirana) [VIP]: 80.00 EUR',
  '#4 Dea Muka (Vlore): 45.00 EUR'
]
[ [ 'TS-303', 4 ], [ 'BK-101', 3 ], [ 'MG-202', 2 ] ]
{ Tirana: 2, Durres: 1, Vlore: 1 }
shipped pending true
404 NotFoundError Order 99 not found
true 2 November
```

## API – Integrate a real API (DummyJSON)

File: `api/products.js` • Run: `npm run api` • URL: https://dummyjson.com/products?limit=10 (open it in your browser first and read the JSON)

Use this URL to fetch the data in JavaScript, then write the code that:

1. **Fetches the data** – `getProducts(url)`: `fetch` does not throw on a 404, so check `res.ok` and throw `Error("HTTP 404")`; return the `products` array.
2. **Lists all product titles and prices** – `listTitlesAndPrices(products)` → `"Essence Mascara Lash Princess: 9.99"`.
3. **Finds the average rating per category** – `averageRatingByCategory(products)`: this uses **`reduce` and grouping** into `{ category: { sum, count } }`, then `sum / count`, 2 decimals.
4. **Computes each product's discounted price** from `price` and `discountPercentage` – `withDiscountedPrice(products)`: `price * (1 - discountPercentage / 100)`, 2 decimals.
5. **Pushes the code on GitHub** (see Submit below).

Expected output (DummyJSON data as of November 2026; if DummyJSON changes its data, the numbers change too):

```
10 products

1. Titles and prices
  Essence Mascara Lash Princess: 9.99
  Eyeshadow Palette with Mirror: 19.99
  Powder Canister: 14.99
  Red Lipstick: 12.99
  Red Nail Polish: 8.99
  Calvin Klein CK One: 49.99
  Chanel Coco Noir Eau De: 129.99
  Dior J'adore: 89.99
  Dolce Shine Eau de: 69.99
  Gucci Bloom Eau de: 79.99

2. Average rating per category
{ beauty: 3.75, fragrances: 3.83 }

3. Discounted prices
  Essence Mascara Lash Princess: 9.99 -10.48% = 8.94
  Eyeshadow Palette with Mirror: 19.99 -18.19% = 16.35
  Powder Canister: 14.99 -9.84% = 13.51
  Red Lipstick: 12.99 -12.16% = 11.41
  Red Nail Polish: 8.99 -11.44% = 7.96
  Calvin Klein CK One: 49.99 -1.89% = 49.05
  Chanel Coco Noir Eau De: 129.99 -16.51% = 108.53
  Dior J'adore: 89.99 -14.72% = 76.74
  Dolce Shine Eau de: 69.99 -0.62% = 69.56
  Gucci Bloom Eau de: 79.99 -14.39% = 68.48
```

---

## Submit: push the code and open a pull request

```bash
git add .
git status                          # no node_modules/ or data/
git commit -m "API: DummyJSON products"
git push -u origin hw-<your-username>
```

On GitHub, click **Compare & pull request**:

- **base repository:** `HersiKopani/awp-homework`, branch `main`
- **title:** `Homework - Name Surname`
- **description:** paste the output of `npm run e1`, `e2`, `e3`, `e4`, `e6` and `api`, and a screenshot of E5

You can keep pushing until the deadline: the pull request updates itself. Pull requests are reviewed and closed, never merged.

## Submission checklist

- [ ] One commit per exercise, during the week
- [ ] `npm run e1` ... `e4`, `e6` and `api` match the expected outputs
- [ ] E5 works in the browser, and `e5/NOTES.md` is filled in
- [ ] Test files and given files are unchanged
- [ ] Pull request to `HersiKopani/awp-homework` before the deadline, titled `Homework - Name Surname`
- [ ] I can explain every line of my code

## Help

- **`node -v` is lower than 22?** Install the LTS version from https://nodejs.org.
- **Windows PowerShell:** the commands are the same; use Git Bash if something behaves differently.
- **`npm run e5` says the port is in use?** Stop the other server (Ctrl+C) or run `PORT=5501 npm run e5`.
- **Output differs only in spaces?** Look again: the test prints exactly what your functions return.
- Questions: ask in the course group, or open the pull request early and write your question in the description.
