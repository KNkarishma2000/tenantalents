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

// apps/backend/admin-service/src/main.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path = __toESM(require("path"), 1);

// apps/backend/admin-service/src/app.ts
var import_express2 = __toESM(require("express"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_cors = __toESM(require("cors"), 1);

// apps/backend/admin-service/src/app/routes/admin.routes.ts
var import_express = require("express");

// apps/backend/admin-service/src/app/services/admin.service.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var adminService = {
  getAllUsers: async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        seller: {
          select: {
            status: true
          }
        }
      }
    });
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      sellerStatus: user.seller?.status ?? null
    }));
  },
  updateUserRole: async (userId, role) => {
    const validRoles = Object.values(import_client.UserRole);
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid user role: ${role}`);
    }
    return prisma.user.update({
      where: { id: userId },
      data: { role }
    });
  },
  getPendingSellers: async () => {
    return prisma.seller.findMany({
      where: { status: import_client.SellerStatus.PENDING },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true
          }
        }
      }
    });
  },
  updateSellerStatus: async (sellerId, approve) => {
    const newStatus = approve ? import_client.SellerStatus.APPROVED : import_client.SellerStatus.REJECTED;
    const seller = await prisma.seller.findUnique({
      where: { id: sellerId }
    });
    if (!seller) {
      throw new Error(`Seller not found with ID: ${sellerId}`);
    }
    return prisma.seller.update({
      where: { id: sellerId },
      data: { status: newStatus }
    });
  },
  getDashboardSummary: async () => {
    const [userCount, sellerCount] = await Promise.all([
      prisma.user.count(),
      prisma.seller.count()
    ]);
    return { userCount, sellerCount };
  }
};

// libs/shared/utils/src/lib/response.ts
function sendError(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    status: "error",
    message
  });
}

// libs/shared/utils/src/lib/invoice-generator.ts
var import_pdfkit = __toESM(require("pdfkit"));

// libs/shared/logger/src/index.ts
init_logger();
init_loggerMiddleware();

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
var import_src = __toESM(require_src());

// libs/shared/utils/src/index.ts
var sendSuccess = (res, message, data) => {
  return res.status(200).json({ success: true, message, data });
};

// apps/backend/admin-service/src/app/controllers/admin.controller.ts
var getAllUsers = async (_, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    return sendSuccess(res, "\u2705 All users fetched successfully", users);
  } catch (err) {
    return next(err);
  }
};
var updateUserRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) {
      return sendError(res, "\u274C userId and role are required.", 400);
    }
    const updatedUser = await adminService.updateUserRole(userId, role);
    return sendSuccess(res, "\u2705 User role updated successfully", updatedUser);
  } catch (err) {
    return next(err);
  }
};
var getPendingSellers = async (_, res, next) => {
  try {
    const pending = await adminService.getPendingSellers();
    return sendSuccess(res, "\u2705 Pending sellers fetched successfully", pending);
  } catch (err) {
    return next(err);
  }
};
var approveSeller = async (req, res, next) => {
  try {
    const { sellerId, approve } = req.body;
    if (!sellerId || typeof approve !== "boolean") {
      return sendError(
        res,
        "\u274C sellerId and approve (boolean) are required.",
        400
      );
    }
    const result = await adminService.updateSellerStatus(sellerId, approve);
    return sendSuccess(
      res,
      `\u2705 Seller ${approve ? "approved" : "rejected"} successfully`,
      result
    );
  } catch (err) {
    return next(err);
  }
};
var getAdminDashboard = async (_, res, next) => {
  try {
    const stats = await adminService.getDashboardSummary();
    return sendSuccess(res, "\u2705 Admin dashboard stats fetched", stats);
  } catch (err) {
    return next(err);
  }
};

// apps/backend/admin-service/src/app/routes/admin.routes.ts
var router = (0, import_express.Router)();
router.get("/users", getAllUsers);
router.put("/users/role", updateUserRole);
router.get("/sellers/pending", getPendingSellers);
router.put("/sellers/status", approveSeller);
router.get("/dashboard", getAdminDashboard);
var admin_routes_default = router;

// libs/shared/swagger/src/lib/setupSwagger.ts
var import_swagger_ui_express = __toESM(require("swagger-ui-express"));
var import_swagger_jsdoc = __toESM(require("swagger-jsdoc"));
function setupSwagger(app2, config) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: config.title,
        version: config.version,
        description: config.description || ""
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
  const swaggerSpec = (0, import_swagger_jsdoc.default)(options);
  app2.use(config.path, import_swagger_ui_express.default.serve, import_swagger_ui_express.default.setup(swaggerSpec));
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

// apps/backend/admin-service/src/app.ts
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use((0, import_helmet.default)());
app.use(import_express2.default.json());
app.use(
  "/api/admin",
  authMiddleware(["admin", "super_admin"]),
  // Only admins/super_admins allowed
  admin_routes_default
);
app.get("/healthz", (req, res) => {
  logger.info("[Health] /healthz pinged");
  res.status(200).send("\u2705 Admin Service healthy");
});
app.get("/readiness", async (_req, res) => {
  try {
    res.status(200).send("\u{1F7E2} Ready");
  } catch (error) {
    logger.error("[Readiness] Check failed", error);
    res.status(500).send("\u{1F534} Not Ready");
  }
});
setupSwagger(app, {
  title: "Admin Service",
  version: "1.0.0",
  path: "/api/docs/admin"
});
app.use((_req, res) => {
  logger.warn("\u26A0\uFE0F Unknown route requested");
  res.status(404).json({ error: "Route not found" });
});
app.use(
  (err, _req, res, _next) => {
    logger.error("[Global Error]", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
);
app.use(errorHandler);
var app_default = app;

// apps/backend/admin-service/src/main.ts
var import_client2 = require("@prisma/client");

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
var kafkaConfig = {
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
var import_src3 = __toESM(require_src());
async function connectKafkaConsumer(config, onMessage2) {
  const consumer2 = getKafkaConsumer();
  if (!consumer2) {
    import_src3.logger.error(
      "[Kafka Consumer] \u274C Consumer not initialized. Did you call connectKafkaClients()?"
    );
    throw new Error("Kafka consumer not connected.");
  }
  try {
    for (const topic of config.topics) {
      await consumer2.subscribe({ topic, fromBeginning: false });
      import_src3.logger.info(`[Kafka Consumer] \u{1F4E5} Subscribed to topic: "${topic}"`);
    }
    await consumer2.run({
      eachMessage: async (payload) => {
        const { topic, partition, message } = payload;
        const value = message?.value?.toString() ?? "";
        import_src3.logger.info(
          `[Kafka Consumer] \u{1F504} Message on topic "${topic}" (partition: ${partition})`
        );
        import_src3.logger.debug(`[Kafka Consumer] \u{1F4E8} Payload: ${value}`);
        try {
          if (onMessage2) {
            await onMessage2(value);
          } else if (config.handleMessage) {
            await config.handleMessage(topic, payload);
          } else {
            import_src3.logger.warn(`[Kafka Consumer] \u26A0\uFE0F No message handler provided`);
          }
        } catch (err) {
          import_src3.logger.error(`[Kafka Consumer] \u274C Error processing message:`, err);
        }
      }
    });
  } catch (error) {
    import_src3.logger.error("[Kafka Consumer] \u274C Failed to run consumer:", error);
    throw error;
  }
}
async function disconnectKafkaConsumer() {
  const consumer2 = getKafkaConsumer();
  if (!consumer2) {
    import_src3.logger.warn("[Kafka Consumer] \u26A0\uFE0F No active consumer to disconnect.");
    return;
  }
  try {
    await consumer2.disconnect();
    import_src3.logger.info("[Kafka Consumer] \u{1F50C} Disconnected from Kafka.");
  } catch (error) {
    import_src3.logger.error("[Kafka Consumer] \u274C Error while disconnecting:", error);
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

// apps/backend/admin-service/src/main.ts
import_dotenv.default.config({ path: import_path.default.resolve(__dirname, "../.env") });
var PORT = parseInt(process.env.PORT || "3008", 10);
var prisma2 = new import_client2.PrismaClient();
var extractAllTopics = (topicsObj) => {
  const flat = [];
  for (const category of Object.values(topicsObj)) {
    if (typeof category === "object") {
      flat.push(...Object.values(category));
    }
  }
  return flat;
};
var kafkaConfig2 = {
  groupId: "admin-service",
  topics: extractAllTopics(KAFKA_TOPICS)
};
var onMessage = async (topic, payload) => {
  try {
    switch (topic) {
      case KAFKA_TOPICS.USER.CREATED:
        logger.info(`[Kafka] \u{1F9D1} User created`);
        break;
      case KAFKA_TOPICS.ORDER.CREATED:
        logger.info(`[Kafka] \u{1F4E6} Order created`);
        break;
      case KAFKA_TOPICS.EMAIL.USER_CREATED:
        logger.info(`[Kafka] \u{1F4E7} Send welcome email`);
        break;
      default:
        logger.warn(`[Kafka] \u2753 No handler for topic: ${topic}`);
        logger.debug(`[Kafka] Payload: ${JSON.stringify(payload, null, 2)}`);
    }
  } catch (err) {
    logger.error(`[Kafka] \u274C Handler error for topic "${topic}"`, err);
  }
};
var kafkaMessageHandler = async (message) => {
  try {
    if (typeof message !== "string") {
      logger.warn("[Kafka] \u26A0\uFE0F Received non-string message");
      return;
    }
    const parsed = JSON.parse(message);
    if (typeof parsed !== "object" || parsed === null || !("topic" in parsed) || !("payload" in parsed)) {
      logger.warn("[Kafka] \u26A0\uFE0F Invalid message format");
      return;
    }
    const { topic, payload } = parsed;
    await onMessage(topic, payload);
  } catch (err) {
    logger.error("[Kafka] \u274C Failed to handle message", err);
  }
};
var server = null;
var isShuttingDown = false;
async function start() {
  try {
    logger.info("\u{1F527} Initializing Admin Service dependencies...");
    if (kafkaConfig2.topics.length === 0) {
      logger.warn("[Kafka] \u26A0\uFE0F No topics configured for consumer");
    }
    await connectRedis();
    logger.info("\u2705 Redis connected");
    await connectKafkaProducer();
    logger.info("\u2705 Kafka producer connected");
    await connectKafkaConsumer(kafkaConfig2, kafkaMessageHandler);
    logger.info("\u2705 Kafka consumer connected");
    server = app_default.listen(PORT, () => {
      logger.info(`\u{1F680} Admin Service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error("\u274C Startup failed:", err);
    await shutdown();
    process.exit(1);
  }
}
async function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;
  logger.info("\u{1F6D1} Gracefully shutting down Admin Service...");
  const shutdownTimeout = setTimeout(() => {
    logger.error("\u23F3 Forced shutdown after timeout");
    process.exit(1);
  }, 1e4);
  try {
    await prisma2.$disconnect();
    logger.info("\u2705 Prisma disconnected");
    if (typeof redisClient?.status === "string" && redisClient.status !== "end") {
      await redisClient.quit();
      logger.info("\u2705 Redis disconnected");
    }
    await disconnectKafkaProducer();
    await disconnectKafkaConsumer();
    logger.info("\u2705 Kafka disconnected");
    if (server) {
      server.close(() => {
        logger.info("\u2705 HTTP server closed");
        clearTimeout(shutdownTimeout);
        process.exit(0);
      });
    } else {
      clearTimeout(shutdownTimeout);
      process.exit(0);
    }
  } catch (err) {
    logger.error("\u274C Shutdown error:", err);
    clearTimeout(shutdownTimeout);
    process.exit(1);
  }
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("unhandledRejection", (reason) => {
  logger.error("\u274C Unhandled Rejection:", reason);
  shutdown();
});
process.on("uncaughtException", (error) => {
  logger.error("\u274C Uncaught Exception:", error);
  shutdown();
});
start();
