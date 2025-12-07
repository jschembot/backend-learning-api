"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseRepository = void 0;
const prisma_1 = require("../db/prisma");
exports.exerciseRepository = {
    async findAll() {
        const rows = await prisma_1.prisma.exercise.findMany({
            orderBy: { createdAt: 'desc' },
        });
        // If changing DB columns or add mappings do it here.
        return rows.map((row) => ({
            id: row.id,
            name: row.name,
            muscleGroups: row.muscleGroups,
            equipment: row.equipment,
            notes: row.notes,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        }));
    },
    async create(input) {
        const created = await prisma_1.prisma.exercise.create({
            data: {
                name: input.name,
                muscleGroups: input.muscleGroups,
                equipment: input.equipment ?? null,
                notes: input.notes ?? null,
            },
        });
        return {
            id: created.id,
            name: created.name,
            muscleGroups: created.muscleGroups,
            equipment: created.equipment,
            notes: created.notes,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };
    },
    async deleteById(id) {
        await prisma_1.prisma.exercise.delete({
            where: { id },
        });
    },
};
