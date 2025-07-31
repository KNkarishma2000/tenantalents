const dockerfileTemplate = (serviceName, port) => `# Production-ready Dockerfile for ${serviceName}

FROM node:20-alpine

WORKDIR /app

# Copy package files first for Docker layer caching
COPY package.json ./
COPY package-lock.json ./
RUN npm install --omit=dev

# Copy app build and required resources
COPY dist/apps/${serviceName} ./dist
COPY prisma ./prisma
COPY .env ./  # Optional: only needed if you read from it in app

ENV NODE_ENV=production
EXPOSE ${port}

CMD ["node", "dist/main"]
`;


# nx build user-service
# docker build -t user-service:latest -f apps/user-service/Dockerfile .