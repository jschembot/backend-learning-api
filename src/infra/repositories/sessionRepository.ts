import { prisma } from "../db/prisma";
import type {
  CreateWorkoutSessionInput,
  SessionId,
  WorkoutSession,
} from "../../domain/sessions";

export const sessionRepository = {
  async findAll(): Promise<WorkoutSession[]> {
    const rows = await prisma.workoutSession.findMany({
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

  async create(input: CreateWorkoutSessionInput): Promise<WorkoutSession> {
    const created = await prisma.workoutSession.create({
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

  async deleteById(id: SessionId): Promise<void> {
    await prisma.workoutSession.delete({
      where: { id },
    });
  },
};
