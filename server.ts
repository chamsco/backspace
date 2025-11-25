import { join } from "path";
import { existsSync } from "fs";

const port = parseInt(process.env.PORT || "3000");
const base = join(import.meta.dir, "dist");

console.log(`Starting server on 0.0.0.0:${port}`);
console.log(`Serving files from ${base}`);

const server = Bun.serve({
  port,
  hostname: "0.0.0.0", // Bind to all interfaces for deployment
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Default to index.html for root
    if (path === "/") path = "/index.html";

    // Try to serve the file directly
    let filePath = join(base, path);
    
    // Security check: ensure we stay within dist
    if (!filePath.startsWith(base)) {
      return new Response("Forbidden", { status: 403 });
    }

    if (existsSync(filePath)) {
        // Check if it's a directory
        try {
            if (Bun.file(filePath).size > 0 || path.endsWith(".html") || path.endsWith(".js") || path.endsWith(".css")) {
                 return new Response(Bun.file(filePath));
            }
        } catch (e) {
            // ignore error, try SPA fallback
        }
    }

    // SPA Fallback: Serve index.html for unknown paths (client-side routing)
    const indexFile = join(base, "index.html");
    if (existsSync(indexFile)) {
        return new Response(Bun.file(indexFile));
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server listening on http://${server.hostname}:${server.port}`);

