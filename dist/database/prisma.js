"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
}
exports.prisma = new client_1.PrismaClient({
    log: ["query"],
});
