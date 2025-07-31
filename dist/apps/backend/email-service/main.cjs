"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// libs/shared/logger/src/lib/logger.ts
var logger_exports = {};
__export(logger_exports, {
  logger: () => logger
});
var import_winston, combine, timestamp, printf, colorize, errors, json, serviceName, isProduction, devFormat, logger;
var init_logger = __esm({
  "libs/shared/logger/src/lib/logger.ts"() {
    "use strict";
    import_winston = require("winston");
    ({ combine, timestamp, printf, colorize, errors, json } = import_winston.format);
    serviceName = process.env.LOG_SERVICE_NAME || "unknown-service";
    isProduction = process.env.NODE_ENV === "production";
    devFormat = printf(({ level, message, timestamp: timestamp2, stack }) => {
      return `[${timestamp2}] [${serviceName}] ${level}: ${stack || message}`;
    });
    logger = (0, import_winston.createLogger)({
      level: process.env.LOG_LEVEL || "info",
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        isProduction ? json() : combine(colorize({ all: true }), devFormat)
      ),
      defaultMeta: { service: serviceName },
      transports: [new import_winston.transports.Console()]
    });
  }
});

// libs/shared/logger/src/lib/loggerMiddleware.ts
var loggerMiddleware_exports = {};
__export(loggerMiddleware_exports, {
  loggerMiddleware: () => loggerMiddleware
});
var loggerMiddleware;
var init_loggerMiddleware = __esm({
  "libs/shared/logger/src/lib/loggerMiddleware.ts"() {
    "use strict";
    init_logger();
    loggerMiddleware = (req, res, next) => {
      const start2 = Date.now();
      res.on("finish", () => {
        const duration = Date.now() - start2;
        logger.info(
          `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
          {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
          }
        );
      });
      next();
    };
  }
});

// libs/shared/auth/src/lib/jwt.ts
function signToken(payload, secret, expiresIn = "1h") {
  return import_jsonwebtoken.default.sign(payload, secret, { expiresIn });
}
function verifyToken(token, secret) {
  const decoded = import_jsonwebtoken.default.verify(token, secret);
  if (typeof decoded === "object" && "id" in decoded && "role" in decoded) {
    return decoded;
  }
  throw new Error("Invalid token payload structure");
}
var import_jsonwebtoken;
var init_jwt = __esm({
  "libs/shared/auth/src/lib/jwt.ts"() {
    "use strict";
    import_jsonwebtoken = __toESM(require("jsonwebtoken"));
  }
});

// libs/shared/auth/src/lib/generateToken.ts
var require_generateToken = __commonJS({
  "libs/shared/auth/src/lib/generateToken.ts"() {
    "use strict";
    init_jwt();
    var import_dotenv2 = __toESM(require("dotenv"));
    var import_path2 = __toESM(require("path"));
    import_dotenv2.default.config({ path: import_path2.default.resolve(__dirname, "../../../../..", ".env") });
    var JWT_SECRET = process.env.JWT_SECRET || "super_secret";
    if (!JWT_SECRET || JWT_SECRET === "super_secret") {
      console.error("\u274C JWT_SECRET not set correctly in .env");
      process.exit(1);
    }
    var payload = {
      userId: "abc123",
      email: "admin@example.com",
      role: "super_admin"
    };
    var token = signToken(payload, JWT_SECRET, "1h");
    console.log("\n\u{1F510} Generated JWT Token:\n");
    console.log(token);
    console.log("\n\u{1F449} Use in Authorization header:\n");
    console.log(`Authorization: Bearer ${token}`);
  }
});

// libs/shared/logger/src/index.js
var require_src = __commonJS({
  "libs/shared/logger/src/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar((init_logger(), __toCommonJS(logger_exports)), exports2);
    __exportStar((init_loggerMiddleware(), __toCommonJS(loggerMiddleware_exports)), exports2);
  }
});

// apps/backend/email-service/src/main.ts
var import_dotenv = __toESM(require("dotenv"));
var import_path = __toESM(require("path"));

// apps/backend/email-service/src/app.ts
var import_express2 = __toESM(require("express"));

// libs/shared/swagger/src/lib/setupSwagger.ts
var import_swagger_ui_express = __toESM(require("swagger-ui-express"));
var import_swagger_jsdoc = __toESM(require("swagger-jsdoc"));
function setupSwagger(app2, config3) {
  const options2 = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: config3.title,
        version: config3.version,
        description: config3.description || ""
        // ✅ Use if provided
      },
      servers: [{ url: "/" }]
    },
    apis: [
      "apps/**/routes/*.ts",
      // Route-based Swagger JSDoc comments
      "apps/**/docs/*.swagger.ts"
      // Dedicated Swagger JSDoc files
    ]
  };
  const swaggerSpec = (0, import_swagger_jsdoc.default)(options2);
  app2.use(config3.path, import_swagger_ui_express.default.serve, import_swagger_ui_express.default.setup(swaggerSpec));
}

// libs/shared/error/src/lib/api-error.ts
var ApiError = class extends Error {
  constructor(statusCode, message, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// libs/shared/error/src/lib/error-handler.ts
var errorHandler = (err, req, res, next) => {
  let customError = err;
  if (!(err instanceof ApiError)) {
    customError = new ApiError(500, "Something went wrong");
  }
  const apiError = customError;
  res.status(apiError.statusCode || 500).json({
    success: false,
    message: apiError.message || "Internal Server Error"
  });
};

// libs/shared/error/src/lib/not-found-handler.ts
var notFoundHandler = (req, _res, next) => {
  const message = `\u{1F50D} Not Found - ${req.originalUrl}`;
  next(new ApiError(404, message));
};

// libs/shared/logger/src/index.ts
init_logger();
init_loggerMiddleware();

// libs/shared/middleware/src/lib/requestLogger.middleware.ts
var requestLoggerMiddleware = (req, _res, next) => {
  console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// libs/shared/middleware/src/lib/rateLimiter.middleware.ts
var import_express_rate_limit = __toESM(require("express-rate-limit"));
var rateLimiterMiddleware = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 100,
  // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});

// libs/shared/middleware/src/lib/helmet.middleware.ts
var import_helmet = __toESM(require("helmet"));
var options = {
  contentSecurityPolicy: false,
  // disable CSP if frontend hosts scripts from multiple domains
  crossOriginEmbedderPolicy: false
  // disable if using 3rd-party iframes (e.g., Stripe)
};
var helmetMiddleware = (0, import_helmet.default)(options);

// libs/shared/middleware/src/lib/cors.middleware.ts
var import_cors = __toESM(require("cors"));
var allowedOrigins = [
  "http://localhost:3000",
  "https://your-vercel-frontend.vercel.app"
  // Replace with your actual Vercel domain
];
var corsMiddleware = (0, import_cors.default)({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
});

// apps/backend/email-service/src/app/routes/email.routes.ts
var import_express = require("express");

// libs/shared/email/src/lib/client.ts
var import_nodemailer = __toESM(require("nodemailer"));

// libs/shared/config/src/lib/env.ts
var env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000", 10),
  // PostgreSQL
  POSTGRES_HOST: process.env.POSTGRES_HOST || "",
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  POSTGRES_DB: process.env.POSTGRES_DB || "",
  POSTGRES_USER: process.env.POSTGRES_USER || "",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
  // Redis
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),
  // Kafka
  KAFKA_BROKER: process.env.KAFKA_BROKER || "localhost:9092",
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || "",
  KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || "",
  // SMTP (Email)
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@mvp-shop.com",
  // ImageKit
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT || "",
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || "",
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || "",
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "fallback_jwt_secret",
  // MinIO
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || "localhost",
  MINIO_PORT: Number(process.env.MINIO_PORT) || 9e3,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || "",
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || "",
  MINIO_BUCKET_NAME: process.env.MINIO_BUCKET_NAME || "invoices",
  // ✅ Service Name
  SERVICE_NAME: process.env.SERVICE_NAME || "unknown-service"
};

// libs/shared/config/src/lib/postgres.ts
var postgresUrl = `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`;

// libs/shared/config/src/lib/redis.ts
var redisConfig = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT
};

// libs/shared/config/src/lib/kafka.ts
var kafkaConfig = {
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKER.split(","),
  // Support comma-separated brokers
  groupId: env.KAFKA_GROUP_ID
};

// libs/shared/config/src/lib/jwt.ts
var jwtConfig = {
  secret: env.JWT_SECRET
};

// libs/shared/config/src/lib/smtp.ts
var smtpConfig = {
  host: env.SMTP_HOST || "",
  port: env.SMTP_PORT || 587,
  user: env.SMTP_USER || "",
  pass: env.SMTP_PASS || ""
};

// libs/shared/config/src/lib/minio.ts
var minioConfig = {
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
  bucket: env.MINIO_BUCKET_NAME
};

// libs/shared/config/src/lib/imagekit.ts
var imageKitConfig = {
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT || "",
  publicKey: env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: env.IMAGEKIT_PRIVATE_KEY || ""
};

// libs/shared/config/src/lib/config.ts
var config = {
  env: env.NODE_ENV,
  port: env.PORT,
  serviceName: env.SERVICE_NAME || "unknown-service",
  // ✅ Added serviceName with fallback
  postgres: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    db: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD
  },
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
  },
  kafka: {
    broker: env.KAFKA_BROKER,
    clientId: env.KAFKA_CLIENT_ID,
    groupId: env.KAFKA_GROUP_ID
  },
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.EMAIL_FROM
  },
  jwt: {
    secret: env.JWT_SECRET
  },
  minio: {
    endpoint: env.MINIO_ENDPOINT,
    port: env.MINIO_PORT,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
    bucketName: env.MINIO_BUCKET_NAME
  },
  imagekit: {
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY
  }
};

// libs/shared/config/src/index.ts
var config2 = {
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",
  service: {
    port: Number(process.env.PORT) || 3e3
  }
  // other config properties here
};

// libs/shared/email/src/lib/client.ts
var transporter = import_nodemailer.default.createTransport({
  host: env.SMTP_HOST,
  // SendGrid SMTP: smtp.sendgrid.net
  port: env.SMTP_PORT,
  // Usually 587
  secure: env.SMTP_PORT === 465,
  // Use TLS for port 465
  auth: {
    user: env.SMTP_USER,
    // Typically "apikey" for SendGrid
    pass: env.SMTP_PASS
    // Your SendGrid API key
  }
});
var sendEmail = async ({
  to,
  subject,
  html
}) => {
  const info = await transporter.sendMail({
    from: `"MVP E-Commerce" <${env.EMAIL_FROM}>`,
    to,
    subject,
    html
  });
  return { messageId: info.messageId };
};

// apps/backend/email-service/src/app/controllers/email.controller.ts
var sendTestEmail = async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    if (!to || !subject || !html) {
      return res.status(400).json({
        message: "\u274C Missing required fields: to, subject, or html"
      });
    }
    const result = await sendEmail({ to, subject, html });
    return res.status(200).json({
      message: "\u2705 Test email sent successfully",
      messageId: result?.messageId ?? "unknown"
    });
  } catch (error) {
    logger.error("[sendTestEmail] \u274C Failed to send email:", error);
    return res.status(500).json({
      message: "\u274C Failed to send test email",
      error: error?.message ?? "Unknown error"
    });
  }
};

// libs/shared/auth/src/index.ts
var src_exports = {};
__export(src_exports, {
  ROLES: () => ROLES,
  authMiddleware: () => authMiddleware,
  isAdmin: () => isAdmin,
  isBuyer: () => isBuyer,
  isBuyerSeller: () => isBuyerSeller,
  isSeller: () => isSeller,
  isSuperAdmin: () => isSuperAdmin,
  oauthMiddleware: () => oauthMiddleware,
  optionalAuthMiddleware: () => optionalAuthMiddleware,
  requireAuth: () => requireAuth,
  requireRole: () => requireRole,
  signToken: () => signToken,
  verifyToken: () => verifyToken
});

// libs/shared/auth/src/lib/authMiddleware.ts
init_jwt();
function authMiddleware(allowedRoles, secret = process.env["JWT_SECRET"]) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Missing or malformed Authorization header" });
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token not provided" });
      return;
    }
    try {
      const decoded = verifyToken(token, secret);
      req.user = decoded;
      if (allowedRoles) {
        const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        if (!allowed.includes(req.user.role)) {
          res.status(403).json({
            message: `Forbidden: Role "${req.user.role}" not authorized`
          });
          return;
        }
      }
      next();
    } catch (err) {
      console.error("\u274C [authMiddleware] Token verification failed:", err);
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }
  };
}
var requireAuth = authMiddleware;

// libs/shared/auth/src/lib/optionalAuthMiddleware.ts
init_jwt();
function optionalAuthMiddleware(secret = process.env.JWT_SECRET) {
  return (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = verifyToken(token, secret);
        req.user = decoded;
      } catch (err) {
        console.warn("\u26A0\uFE0F [optionalAuthMiddleware] Invalid or expired token.");
        req.user = void 0;
      }
    }
    next();
  };
}

// libs/shared/auth/src/lib/requireRole.ts
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user?.role) {
      return res.status(403).json({
        message: "Access denied",
        detail: "No authenticated user or role found on request"
      });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Access denied",
        detail: `Required role(s): [${allowedRoles.join(", ")}], but found: '${user.role}'`
      });
    }
    next();
  };
}

// libs/shared/auth/src/index.ts
__reExport(src_exports, __toESM(require_generateToken()));
init_jwt();

// libs/shared/auth/src/lib/oauth.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
function oauthMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing OAuth token" });
  try {
    const decoded = import_jsonwebtoken2.default.decode(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid OAuth token" });
  }
}

// libs/shared/auth/src/lib/types.ts
var ROLES = {
  BUYER: "buyer",
  SELLER: "seller",
  BUYER_SELLER: "buyer_seller",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin"
};
var isBuyer = (user) => user?.role === ROLES.BUYER;
var isSeller = (user) => user?.role === ROLES.SELLER;
var isBuyerSeller = (user) => user?.role === ROLES.BUYER_SELLER;
var isAdmin = (user) => user?.role === ROLES.ADMIN;
var isSuperAdmin = (user) => user?.role === ROLES.SUPER_ADMIN;

// apps/backend/email-service/src/app/routes/email.routes.ts
var router = (0, import_express.Router)();
var jwtSecret = process.env.JWT_SECRET || "default_secret";
router.post(
  "/test",
  authMiddleware(["admin", "super_admin"], jwtSecret),
  // UserRole as string union
  sendTestEmail
);
var email_routes_default = router;

// apps/backend/email-service/src/app.ts
var app = (0, import_express2.default)();
logger.info("\u{1F4E8} Initializing Email Service");
app.use(import_express2.default.json());
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(rateLimiterMiddleware);
app.use(requestLoggerMiddleware);
app.use("/api/email", email_routes_default);
setupSwagger(app, {
  title: "Email Service",
  version: "1.0.0",
  description: "Handles transactional and notification emails",
  path: "/api/docs/email"
});
app.get("/healthz", (_req, res) => {
  return res.status(200).send("\u2705 Email Service healthy");
});
app.use(notFoundHandler);
app.use(errorHandler);
var app_default = app;

// apps/backend/email-service/src/main.ts
var import_client = require("@prisma/client");

// libs/shared/redis/src/lib/keys.ts
var DEFAULT_TTL = 60 * 60;

// libs/shared/redis/src/lib/redis.ts
var import_redis = require("redis");
var import_src2 = __toESM(require_src());
var redisClient = (0, import_redis.createClient)({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379
  },
  password: process.env.REDIS_PASSWORD || void 0
});
async function connectRedis() {
  redisClient.on("error", (err) => import_src2.logger.error("\u274C Redis Error:", err));
  await redisClient.connect();
  import_src2.logger.info("\u2705 Redis connected");
}

// libs/shared/kafka/src/lib/kafka-client.ts
var import_kafkajs = require("kafkajs");
var kafka = null;
var consumer = null;
var getKafkaInstance = () => {
  if (!kafka) {
    throw new Error("Kafka is not initialized. Call initKafka() first.");
  }
  return kafka;
};
var getKafkaConsumer = () => {
  if (!consumer) {
    throw new Error("Kafka consumer is not initialized");
  }
  return consumer;
};

// libs/shared/kafka/src/lib/kafka-config.ts
var import_kafkajs2 = require("kafkajs");
var kafkaConfig2 = {
  clientId: "hktvmall-style-backend",
  brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
  logLevel: import_kafkajs2.logLevel.INFO
  // Uncomment only if your KRaft cluster requires auth
  /*
  ssl: true,
  sasl: {
    mechanism: 'plain', // Or 'scram-sha-256' or 'scram-sha-512'
    username: process.env.KAFKA_USERNAME || '',
    password: process.env.KAFKA_PASSWORD || '',
  },
  */
};

// libs/shared/kafka/src/lib/kafka-producer.ts
var producer = null;
async function connectKafkaProducer() {
  if (producer) {
    logger.debug("[Kafka Producer] \u{1F7E2} Already connected");
    return producer;
  }
  const kafka2 = getKafkaInstance();
  if (!kafka2) {
    throw new Error("[Kafka Producer] \u274C Kafka is not initialized");
  }
  producer = kafka2.producer();
  try {
    await producer.connect();
    logger.info("[Kafka Producer] \u2705 Connected");
    return producer;
  } catch (error) {
    logger.error("[Kafka Producer] \u274C Connection failed:", error);
    producer = null;
    throw error;
  }
}
async function disconnectKafkaProducer() {
  if (!producer) {
    logger.warn("[Kafka Producer] \u26A0\uFE0F No active producer to disconnect.");
    return;
  }
  try {
    await producer.disconnect();
    logger.info("[Kafka Producer] \u{1F50C} Disconnected");
  } catch (error) {
    logger.error("[Kafka Producer] \u274C Disconnection failed:", error);
  } finally {
    producer = null;
  }
}

// libs/shared/kafka/src/lib/kafka-consumer.ts
async function connectKafkaConsumer(config3, onMessage2) {
  const consumer2 = getKafkaConsumer();
  if (!consumer2) {
    logger.error(
      "[Kafka Consumer] \u274C Consumer not initialized. Did you call connectKafkaClients()?"
    );
    throw new Error("Kafka consumer not connected.");
  }
  try {
    for (const topic of config3.topics) {
      await consumer2.subscribe({ topic, fromBeginning: false });
      logger.info(`[Kafka Consumer] \u{1F4E5} Subscribed to topic: "${topic}"`);
    }
    await consumer2.run({
      eachMessage: async (payload) => {
        const { topic, partition, message } = payload;
        const value = message?.value?.toString() ?? "";
        logger.info(
          `[Kafka Consumer] \u{1F504} Message on topic "${topic}" (partition: ${partition})`
        );
        logger.debug(`[Kafka Consumer] \u{1F4E8} Payload: ${value}`);
        try {
          if (onMessage2) {
            await onMessage2(value);
          } else if (config3.handleMessage) {
            await config3.handleMessage(topic, payload);
          } else {
            logger.warn(`[Kafka Consumer] \u26A0\uFE0F No message handler provided`);
          }
        } catch (err) {
          logger.error(`[Kafka Consumer] \u274C Error processing message:`, err);
        }
      }
    });
  } catch (error) {
    logger.error("[Kafka Consumer] \u274C Failed to run consumer:", error);
    throw error;
  }
}
async function disconnectKafkaConsumer() {
  const consumer2 = getKafkaConsumer();
  if (!consumer2) {
    logger.warn("[Kafka Consumer] \u26A0\uFE0F No active consumer to disconnect.");
    return;
  }
  try {
    await consumer2.disconnect();
    logger.info("[Kafka Consumer] \u{1F50C} Disconnected from Kafka.");
  } catch (error) {
    logger.error("[Kafka Consumer] \u274C Error while disconnecting:", error);
  }
}

// libs/shared/kafka/src/lib/kafka-topics.ts
var KAFKA_TOPICS = {
  USER: {
    CREATED: "user.created",
    UPDATED: "user.updated",
    DELETED: "user.deleted",
    REGISTERED: "user.registered"
  },
  ORDER: {
    CREATED: "order.created",
    STATUS_UPDATED: "order.status.updated",
    CANCELLED: "order.cancelled"
  },
  PAYMENT: {
    INITIATED: "payment.initiated",
    SUCCESS: "payment.success",
    FAILED: "payment.failed"
  },
  PRODUCT: {
    CREATED: "product.created",
    UPDATED: "product.updated",
    DELETED: "product.deleted",
    RATED: "product.rated"
  },
  EMAIL: {
    USER_CREATED: "email.user.created",
    ORDER_CREATED: "email.order.created",
    PAYMENT_SUCCESS: "email.payment.success"
  },
  INVOICE: {
    GENERATE: "invoice.generate",
    GENERATED: "invoice.generated",
    FAILED: "invoice.failed"
  },
  NOTIFICATION: {
    SENT: "notification.sent"
  },
  CART: {
    UPDATED: "cart.updated",
    CHECKED_OUT: "cart.checkedout"
  },
  ANALYTICS: {
    USER_BEHAVIOR_RECORDED: "analytics.user.behavior"
  },
  SEARCH: {
    SYNC_PRODUCT_INDEX: "search.sync.product"
  },
  VENDOR: {
    CREATED: "vendor.created",
    STATUS_UPDATED: "vendor.status.updated"
  }
};
var ALL_KAFKA_TOPICS = Object.values(KAFKA_TOPICS).flatMap(
  (group) => Object.values(group)
);

// libs/shared/minio/src/lib/minio-client.ts
var import_minio = require("minio");
console.log("\u{1F4E6} MinIO Environment Config:");
console.log("MINIO_ENDPOINT:", process.env.MINIO_ENDPOINT);
console.log("MINIO_PORT:", process.env.MINIO_PORT);
console.log("MINIO_ACCESS_KEY:", process.env.MINIO_ACCESS_KEY);
console.log("MINIO_SECRET_KEY:", process.env.MINIO_SECRET_KEY);
var rawEndpoint = process.env.MINIO_ENDPOINT;
var rawPort = process.env.MINIO_PORT;
if (!rawEndpoint || !rawPort) {
  throw new Error("\u274C MINIO_ENDPOINT or MINIO_PORT is not defined!");
}
var cleanedEndpoint = rawEndpoint.replace(/^https?:\/\//, "");
var port = parseInt(rawPort, 10);
if (isNaN(port)) {
  throw new Error(`\u274C Invalid MINIO_PORT: ${rawPort}`);
}
var minioClient = new import_minio.Client({
  endPoint: cleanedEndpoint,
  port,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});
(async () => {
  try {
    const buckets = await minioClient.listBuckets();
    console.log("\u2705 Connected to MinIO. Buckets:", buckets);
  } catch (err) {
    console.error("\u274C MinIO connection failed:", err);
  }
})();

// libs/shared/minio/src/lib/minio-connection.ts
var import_src3 = __toESM(require_src());

// libs/shared/constants/src/lib/jwt-config.ts
var JWT_CONFIG = {
  secret: process.env.JWT_SECRET || "default_jwt_secret",
  expiresIn: "1d"
};

// libs/shared/constants/src/lib/service-ports.ts
var SERVICE_PORTS = {
  ["user-service" /* USER */]: 3e3,
  ["product-service" /* PRODUCT */]: 3001,
  ["order-service" /* ORDER */]: 3002,
  ["rating-service" /* RATING */]: 3003,
  ["email-service" /* EMAIL */]: 3004,
  ["payment-service" /* PAYMENT */]: 3005,
  ["search-service" /* SEARCH */]: 3006,
  ["cart-service" /* CART */]: 3007,
  ["admin-service" /* ADMIN */]: 3008,
  ["invoice-service" /* INVOICE */]: 3009,
  ["analytics-service" /* ANALYTICS */]: 3010,
  ["vendor-service" /* VENDOR */]: 3011
};

// apps/backend/email-service/src/main.ts
import_dotenv.default.config({ path: import_path.default.resolve(__dirname, "../../../../.env") });
var SERVICE_NAME = "email-service" /* EMAIL */;
var PORT = SERVICE_PORTS[SERVICE_NAME];
var prisma = new import_client.PrismaClient();
var kafkaConfig3 = {
  groupId: SERVICE_NAME,
  topics: []
  // Future: Add email-related topics like EMAIL_SENT
};
var onMessage = async (_topic, _payload) => {
  logger.warn(`\u26A0\uFE0F No Kafka consumer logic implemented in ${SERVICE_NAME}`);
};
var kafkaMessageHandler = async (rawMessage) => {
  try {
    const { topic, payload } = JSON.parse(rawMessage);
    await onMessage(topic, payload);
  } catch (err) {
    logger.error("\u274C Failed to handle Kafka message", err);
  }
};
var server = null;
async function start() {
  try {
    logger.info(`\u{1F4E8} Starting ${SERVICE_NAME}...`);
    await connectRedis();
    await connectKafkaProducer();
    await connectKafkaConsumer(kafkaConfig3, kafkaMessageHandler);
    await prisma.$connect();
    const bucket = process.env.MINIO_BUCKET || "email-files";
    const exists = await minioClient.bucketExists(bucket);
    if (!exists) {
      await minioClient.makeBucket(bucket);
      logger.info(`\u{1FAA3} MinIO bucket "${bucket}" created`);
    } else {
      logger.info(`\u2705 MinIO bucket "${bucket}" already exists`);
    }
    server = app_default.listen(PORT, () => {
      logger.info(`\u{1F680} ${SERVICE_NAME} running at http://localhost:${PORT}`);
      logger.info(`\u{1F4DA} Swagger docs at http://localhost:${PORT}/api/docs/email`);
    });
  } catch (err) {
    logger.error(`\u274C ${SERVICE_NAME} failed to start`, err);
    await shutdown();
    process.exit(1);
  }
}
async function shutdown() {
  logger.info(`\u{1F6D1} Shutting down ${SERVICE_NAME}...`);
  try {
    await prisma.$disconnect();
    if (typeof redisClient.status === "string" && redisClient.status === "ready") {
      await redisClient.quit();
    }
    await disconnectKafkaProducer();
    await disconnectKafkaConsumer();
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            logger.error("\u274C Error closing HTTP server", err);
            reject(err);
          } else {
            logger.info("\u2705 HTTP server closed");
            resolve(true);
          }
        });
      });
    }
    process.exit(0);
  } catch (err) {
    logger.error("\u274C Error during shutdown", err);
    process.exit(1);
  }
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
start();
