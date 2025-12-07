import {
  CreateWorkoutSessionInput,
  CreateWorkoutSet,
  WorkoutSession,
  WorkoutSet,
  SessionId,
} from "../../domain/sessions";
import { sessionRepository } from "../../infra/repositories/sessionRepository";
import { workoutSetRepository } from "../../infra/repositories/workoutSetRepository";

export const sessionService = {
  async listSessions(): Promise<WorkoutSession[]> {
    return sessionRepository.findAll();
  },

  async createSession(
    input: CreateWorkoutSessionInput
  ): Promise<WorkoutSession> {
    return sessionRepository.create(input);
  },

  async deleteSession(id: SessionId): Promise<void> {
    await sessionRepository.deleteById(id);
  },

  async listSetsForSession(sessionId: SessionId): Promise<WorkoutSet[]> {
    return workoutSetRepository.findBySession(sessionId);
  },

  async addSetToSession(
    sessionId: SessionId,
    input: CreateWorkoutSet
  ): Promise<WorkoutSet> {
    return workoutSetRepository.create(sessionId, input);
  },

  async deleteSet(setId: string): Promise<void> {
    await workoutSetRepository.delete(setId);
  },
};
