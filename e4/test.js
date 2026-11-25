import { getUser, getSlowReport } from "./api.js";
import { withTimeout, loadDashboard } from "./async.js";

// 1. sequential vs parallel
let t = performance.now();
for (const id of [1, 2]) await getUser(id);
console.log("sequential:", Math.round((performance.now() - t) / 100) * 100, "ms");
t = performance.now();
await Promise.all([1, 2].map(getUser));
console.log("parallel:  ", Math.round((performance.now() - t) / 100) * 100, "ms");

// 2. timeout
try {
  await withTimeout(getSlowReport(), 500);
} catch (err) {
  console.log(err.message);
}

// 3. dashboard with retry and allSettled
const { users, errors } = await loadDashboard([1, 3, 99]);
console.log(users.map((u) => `${u.name}: ${u.orders.length} order(s)`));
console.log(errors);
