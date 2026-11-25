import { getUser, getOrders } from "./api.js";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function withTimeout(promise, ms) {
  // TODO: reject with Error("Timeout after 500 ms") if promise is slower
  //       hint: Promise.race; clear the timer when done
}

export async function retry(fn, { times = 3, delay = 50 } = {}) {
  // TODO: call fn up to `times` times, sleep(delay) between attempts
  //       print "  attempt 1 failed: <message>, retrying"
  //       do NOT retry errors whose message starts with "4" (4xx)
}

export async function loadUser(id) {
  // TODO: user (with retry) and orders IN PARALLEL -> { ...user, orders }
}

export async function loadDashboard(ids) {
  // TODO: Promise.allSettled -> { users: [...], errors: [messages] }
}
