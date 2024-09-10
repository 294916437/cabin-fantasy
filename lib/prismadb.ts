import { PrismaClient } from "@prisma/client";

// 创建全局Prisma客户端实例
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
