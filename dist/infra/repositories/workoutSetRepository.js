"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutSetRepository = void 0;
const prisma_1 = require("../db/prisma");
exports.workoutSetRepository = {
    async findBySession(sessionId) {
        const rows = await prisma_1.prisma.workoutSet.findMany({
            where: { sessionId },
            orderBy: { setIndex: "asc" },
        });
        return rows.map((row) => ({
            id: row.id,
            sessionId: row.sessionId,
            exerciseId: row.exerciseId,
            setIndex: row.setIndex,
            weight: row.weight,
            reps: row.reps,
            notes: row.notes,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        }));
    },
    async findBySessionWithRelations(sessionId) {
        const rows = await prisma_1.prisma.workoutSet.findMany({
            where: { sessionId },
            include: {
                session: true,
                exercise: true,
            },
            orderBy: { setIndex: "asc" },
        });
        return rows.map((row) => ({
            id: row.id,
            sessionId: row.sessionId,
            exerciseId: row.exerciseId,
            setIndex: row.setIndex,
            weight: row.weight,
            reps: row.reps,
            notes: row.notes,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            session: {
                id: row.session.id,
                title: row.session.title,
                date: row.session.date,
                notes: row.session.notes,
                createdAt: row.session.createdAt,
                updatedAt: row.session.updatedAt,
            },
            exercise: {
                id: row.exercise.id,
                name: row.exercise.name,
                muscleGroups: row.exercise.muscleGroups,
                equipment: row.exercise.equipment,
                notes: row.exercise.notes,
                createdAt: row.exercise.createdAt,
                updatedAt: row.exercise.updatedAt,
            },
        }));
    },
    async create(sessionId, input) {
        const created = await prisma_1.prisma.workoutSet.create({
            data: {
                sessionId,
                exerciseId: input.exerciseId,
                setIndex: input.setIndex ?? 1,
                weight: input.weight ?? null,
                reps: input.reps ?? null,
                notes: input.notes ?? null,
            },
        });
        return {
            id: created.id,
            sessionId: created.sessionId,
            exerciseId: created.exerciseId,
            setIndex: created.setIndex,
            weight: created.weight,
            reps: created.reps,
            notes: created.notes,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };
    },
    async delete(setId) {
        await prisma_1.prisma.workoutSet.delete({
            where: { id: setId },
        });
    },
};
