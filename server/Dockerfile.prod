# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY server/package*.json ./server/
COPY packages/types/package*.json ./packages/types/

RUN npm install

COPY packages/types ./packages/types
COPY server ./server

WORKDIR /app/server
RUN npm run build


# Stage 2: Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package*.json ./server/

EXPOSE 5000

CMD ["node", "server/dist/index.js"]
