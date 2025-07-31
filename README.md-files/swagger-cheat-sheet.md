# 1. Install Swagger packages
npm install swagger-ui-express swagger-jsdoc

# 2. Run your backend service (Nx or npm)
npx nx run <service-name>:serve
npx nx serve service-name
npx nx build service-name

# OR
npm start

# 3. Visit in browser
http://localhost:<port>/api-docs
