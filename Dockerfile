# Étape 1 : Build de l'app
FROM node:20-alpine AS builder
WORKDIR /app
COPY edtech/package.json edtech/package-lock.json ./
RUN npm ci --prefer-offline --no-audit
COPY edtech/ ./
RUN npm run build

# Étape 2 : Image de production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copie uniquement le nécessaire
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/postcss.config.* ./
COPY --from=builder /app/tailwind.config.* ./

# Utilisateur non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
CMD ["npm", "start"] 