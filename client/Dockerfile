# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY client/package*.json ./client/
COPY packages/types/package*.json ./packages/types/

RUN npm install

COPY packages/types ./packages/types
COPY client ./client

WORKDIR /app/client
RUN npm run build


# Stage 2: Production stage
FROM nginx:alpine AS production

COPY --from=builder /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
