import { prisma } from "../db/prisma";
import type {
  WorkoutSet,
  WorkoutSetWithRelations,
  CreateWorkoutSet,
  SessionId,
} from "../../domain/sessions";

export const workoutSetRepository = {
  async findBySession(sessionId: SessionId): Promise<WorkoutSet[]> {
    const rows = await prisma.workoutSet.findMany({
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

  async findBySessionWithRelations(
    sessionId: SessionId
  ): Promise<WorkoutSetWithRelations[]> {
    const rows = await prisma.workoutSet.findMany({
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

  async create(
    sessionId: SessionId,
    input: CreateWorkoutSet
  ): Promise<WorkoutSet> {
    const created = await prisma.workoutSet.create({
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

  async delete(setId: string): Promise<void> {
    await prisma.workoutSet.delete({
      where: { id: setId },
    });
  },
};
