// Given: a tiny static file server for E5. Run: npm run e5, then open http://localhost:5500
import http from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
const PORT = Number(process.env.PORT) || 5500;

http.createServer(async (req, res) => {
  const file = req.url === "/" ? "index.html" : req.url.split("?")[0].slice(1);
  if (file.includes("..")) { res.writeHead(400); return res.end(); }
  try {
    const body = await readFile(join(import.meta.dirname, file));
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "text/plain" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end("Not found");
  }
}).listen(PORT, () => console.log(`E5 on http://localhost:${PORT}`));
