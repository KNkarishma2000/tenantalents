name: Backend CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    env:
      # Load secrets into environment variables
      POSTGRES_USER: ${{ secrets.POSTGRES_USER }}
      POSTGRES_PASSWORD: ${{ secrets.POSTGRES_PASSWORD }}
      POSTGRES_DB: ${{ secrets.POSTGRES_DB }}
      KAFKA_BROKER: ${{ secrets.KAFKA_BROKER }}
      REDIS_URL: ${{ secrets.REDIS_URL }}
      MINIO_ACCESS_KEY: ${{ secrets.MINIO_ACCESS_KEY }}
      MINIO_SECRET_KEY: ${{ secrets.MINIO_SECRET_KEY }}
      MINIO_ENDPOINT: ${{ secrets.MINIO_ENDPOINT }}

    services:
      postgres:
        image: postgres:15
        ports: ["5432:5432"]
        env:
          POSTGRES_USER: ${{ secrets.POSTGRES_USER }}
          POSTGRES_PASSWORD: ${{ secrets.POSTGRES_PASSWORD }}
          POSTGRES_DB: ${{ secrets.POSTGRES_DB }}
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7
        ports: ["6379:6379"]

      kafka:
        image: bitnami/kafka:latest
        ports: ["9092:9092"]
        env:
          KAFKA_CFG_NODE_ID: 1
          KAFKA_CFG_PROCESS_ROLES: broker,controller
          KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
          KAFKA_CFG_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
          KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
          KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
          KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
          KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE: "true"

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build all apps
        run: npx nx run-many --target=build --all

      - name: Run unit tests
        run: npx nx run-many --target=test --all
