FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
COPY apps/storefront/package*.json ./apps/storefront/
COPY apps/backend/package*.json ./apps/backend/
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

WORKDIR /app/apps/backend
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/.medusa ./apps/backend/.medusa
COPY --from=builder /app/apps/backend/medusa-config.ts ./apps/backend/medusa-config.ts
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/tsconfig.json ./apps/backend/tsconfig.json

WORKDIR /app/apps/backend
RUN mkdir -p uploads

EXPOSE 9000
CMD ["npm", "run", "start"]
