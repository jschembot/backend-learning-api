import { Exercise, ExerciseId } from "./exercises";

export type SessionId = string;
export type WorkoutSetId = string;

export interface WorkoutSession {
  id: SessionId;
  title: string;
  date: Date;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkoutSessionInput {
  title: string;
  date?: Date;
  notes?: string | null;
}

export interface WorkoutSet {
  id: WorkoutSetId;
  sessionId: SessionId;
  exerciseId: ExerciseId;
  setIndex: number;
  weight: number | null;
  reps: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkoutSet {
  exerciseId: ExerciseId;
  setIndex?: number | null;
  weight?: number | null;
  reps?: number | null;
  notes?: string | null;
}

export interface WorkoutSetWithRelations extends WorkoutSet {
  session: WorkoutSession;
  exercise: Exercise;
}
