import { parseResponse, category } from "./http.js";

const responses = [
  'HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nCache-Control: max-age=60\r\n\r\n{"id":1,"title":"Learn HTTP"}',
  "HTTP/1.1 301 Moved Permanently\r\nLocation: https://umt.edu.al/\r\nContent-Length: 0\r\n\r\n",
  "HTTP/1.1 404 Not Found\r\ncontent-type: text/plain\r\n\r\nNo such page",
];

for (const raw of responses) {
  const r = parseResponse(raw);
  console.log(r.status, r.statusText, "|", category(r.status));
  console.log("  type:", r.headers["content-type"] ?? "-", "| location:", r.headers.location ?? "-");
  console.log("  body:", r.body);
}
