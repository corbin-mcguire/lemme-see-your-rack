FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .


RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist .

EXPOSE 4173

CMD ["node", "index.js"]
