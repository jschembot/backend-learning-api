"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../../../node_modules/@prisma/client");
exports.prisma = new client_1.PrismaClient({
    adapter: {
        provider: 'postgresql',
        url: process.env.DATABASE_URL,
    },
});
