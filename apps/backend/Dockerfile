FROM node:20-alpine AS deps
WORKDIR /app

# Copy root workspace files
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/

# Install all workspace deps
RUN npm install --workspace=apps/backend

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules
COPY package.json package-lock.json ./
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend
RUN npx medusa build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend ./

RUN mkdir -p uploads

EXPOSE 9000
CMD ["npx", "medusa", "start"]
