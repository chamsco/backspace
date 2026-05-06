# 1. Build stage
FROM oven/bun:1.1.0 as builder

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build

# 2. Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
