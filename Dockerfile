# syntax=docker/dockerfile:1

# --- Build frontend ---------------------------------------------------------
FROM node:18-bullseye AS frontend
WORKDIR /app
COPY vue-starter/package*.json vue-starter/
RUN cd vue-starter && npm install
COPY vue-starter vue-starter
ENV NODE_ENV=development
ENV DOCKER_BUILD=true
RUN cd vue-starter && npm run build

# --- Install backend deps ---------------------------------------------------
FROM node:18-bullseye AS backend_deps
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev

# --- Runtime image ----------------------------------------------------------
FROM node:18-bullseye
WORKDIR /app

# Copy backend
COPY --from=backend_deps /app/backend /app/backend

# Copy built frontend into backend/dist
COPY --from=frontend /app/vue-starter/dist /app/backend/dist

WORKDIR /app/backend

ENV NODE_ENV=production \
    PORT=4000

EXPOSE 4000

CMD ["node", "server.js"]


