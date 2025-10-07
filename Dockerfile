# ---- Build stage ----
FROM node:20 AS build

# Enable pnpm via corepack
RUN corepack enable

WORKDIR /app

# Copy dependency files first
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build-time variable (you pass this via --build-arg)
ARG VITE_API_SERVER

# Expose it to the build environment (so Vite can read it)
ENV VITE_API_SERVER=${VITE_API_SERVER}

# Hardcoded
ENV VITE_SECURE_LOCAL_STORAGE_HASH_KEY=GB123balA
ENV VITE_SECURE_LOCAL_STORAGE_IV_KEY=CE9928881hB

# Build
RUN pnpm run build

# ---- Serve stage ----
FROM nginx:stable-alpine AS production

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
