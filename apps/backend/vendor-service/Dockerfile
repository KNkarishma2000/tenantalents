FROM node:18

WORKDIR /app
COPY . .
RUN npm install -g nx && npm install
RUN npm run build vendor-service

CMD ["node", "dist/apps/vendor-service/src/main.js"]
