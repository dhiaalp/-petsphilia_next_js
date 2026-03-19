# Petsphilia Platform

This repository contains:

- `apps/storefront`: a Next.js 15 storefront for Petsphilia.
- `apps/backend`: a Medusa backend configured for PostgreSQL, Redis, and the publishable key flow used by the storefront.

## Architecture

- Deploy `apps/backend` to a Railway service with PostgreSQL and Redis attached.
- Deploy `apps/storefront` to a separate Railway service.
- Configure the storefront to talk to the Medusa Store API through `NEXT_PUBLIC_MEDUSA_BACKEND_URL` and `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.

## Local setup

1. Install Node.js 20 or newer.
2. From the repository root, run `npm install`.
3. Copy `apps/backend/.env.example` to `apps/backend/.env`.
4. Copy `apps/storefront/.env.example` to `apps/storefront/.env.local`.
5. Start the backend with `npm run dev:backend`.
6. Start the storefront with `npm run dev:storefront`.

## Railway deployment

Create two Railway services from this repo:

### Backend service

- Root directory: `apps/backend`
- Start command: `npm run start`
- Build command: `npm run build`
- Add a PostgreSQL plugin and a Redis plugin.
- Set the variables from `apps/backend/.env.example`.
- After the first deploy, run Medusa migrations with `npx medusa db:migrate`.

### Storefront service

- Root directory: `apps/storefront`
- Start command: `npm run start`
- Build command: `npm run build`
- Set the variables from `apps/storefront/.env.example`.
- Point `NEXT_PUBLIC_MEDUSA_BACKEND_URL` to the public Railway URL of the backend.

## Storefront features

- Custom landing page based on the supplied Petsphilia design.
- Product listing loaded from Medusa collections and Store API products.
- Product detail pages with variant selection and add-to-cart.
- Cart page backed by Medusa carts.
- Responsive layout for mobile and desktop.

## Backend notes

The backend includes:

- Medusa server config for Railway.
- File module via local storage by default.
- CORS values for Railway storefront deployment.

You will still need to:

- create a region in Medusa Admin;
- create sales channels and products;
- generate a publishable API key in Medusa Admin;
- optionally replace local file storage with S3 or Cloudinary before production use.

