import { prisma } from '../db/prisma';
import type {
  Exercise,
  ExerciseId,
  CreateExerciseInput,
} from '../../domain/exercises';

export const exerciseRepository = {
  async findAll(): Promise<Exercise[]> {
    const rows = await prisma.exercise.findMany({
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

  async create(input: CreateExerciseInput): Promise<Exercise> {
    const created = await prisma.exercise.create({
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

  async deleteById(id: ExerciseId): Promise<void> {
    await prisma.exercise.delete({
      where: { id },
    });
  },
};
