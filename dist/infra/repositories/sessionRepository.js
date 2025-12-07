"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRepository = void 0;
const prisma_1 = require("../db/prisma");
exports.sessionRepository = {
    async findAll() {
        const rows = await prisma_1.prisma.workoutSession.findMany({
            orderBy: { date: "desc" },
        });
        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            date: row.date,
            notes: row.notes,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        }));
    },
    async create(input) {
        const created = await prisma_1.prisma.workoutSession.create({
            data: {
                title: input.title ?? null,
                notes: input.notes ?? null,
                ...(input.date ? { date: input.date } : {}),
            },
        });
        return {
            id: created.id,
            title: created.title,
            date: created.date,
            notes: created.notes,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };
    },
    async deleteById(id) {
        await prisma_1.prisma.workoutSession.delete({
            where: { id },
        });
    },
};
