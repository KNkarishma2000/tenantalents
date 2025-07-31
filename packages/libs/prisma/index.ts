import {PrismaClient} from "../../../generated/prisma/client"

declare global {
    var prismaDb: PrismaClient;
}

const prisma = globalThis.prismaDb || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prismaDb = globalThis.prismaDb || prisma;
}

export default prisma;