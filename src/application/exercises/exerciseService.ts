import { exerciseRepository } from '../../infra/repositories/exerciseRepository';
import type {
  Exercise,
  ExerciseId,
  CreateExerciseInput,
} from '../../domain/exercises';

export const exerciseService = {
  async listExercises(): Promise<Exercise[]> {
    // TODO: dd filtering, paging, etc., it goes here.
    return exerciseRepository.findAll();
  },

  async createExercise(input: CreateExerciseInput): Promise<Exercise> {
    const trimmedName = input.name.trim();
    if (!trimmedName) {
      throw new Error('Exercise name is required');
    }

    const muscleGroups = (input.muscleGroups ?? []).map((m) => m.trim()).filter(Boolean);
    if (muscleGroups.length === 0) {
      // require at least one muscle group
      throw new Error('At least one muscle group is required');
    }

    return exerciseRepository.create({
      ...input,
      name: trimmedName,
      muscleGroups,
    });
  },

  async deleteExercise(id: ExerciseId): Promise<void> {
    // TODO: add checks: "is exercise used in any session" etc.
    await exerciseRepository.deleteById(id);
  },
};
