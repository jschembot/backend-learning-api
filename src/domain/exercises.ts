export type ExerciseId = string;

export interface Exercise {
  id: ExerciseId;
  name: string;
  muscleGroups: string[];
  equipment: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExerciseInput {
  name: string;
  muscleGroups: string[];
  equipment?: string | null;
  notes?: string | null;
}
