FROM node:20-alpine AS builder
WORKDIR /app

# Copy only the backend package.json (standalone install, no workspace)
COPY apps/backend/package.json ./package.json

# Install dependencies
RUN npm install

# Copy backend source
COPY apps/backend ./

# Build Medusa
RUN npx medusa build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/medusa-config.ts ./medusa-config.ts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src

RUN mkdir -p uploads

EXPOSE 9000
CMD ["npx", "medusa", "start"]
