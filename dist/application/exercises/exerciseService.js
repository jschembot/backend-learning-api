"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseService = void 0;
const exerciseRepository_1 = require("../../infra/repositories/exerciseRepository");
exports.exerciseService = {
    async listExercises() {
        // TODO: dd filtering, paging, etc., it goes here.
        return exerciseRepository_1.exerciseRepository.findAll();
    },
    async createExercise(input) {
        const trimmedName = input.name.trim();
        if (!trimmedName) {
            throw new Error('Exercise name is required');
        }
        const muscleGroups = (input.muscleGroups ?? []).map((m) => m.trim()).filter(Boolean);
        if (muscleGroups.length === 0) {
            // require at least one muscle group
            throw new Error('At least one muscle group is required');
        }
        return exerciseRepository_1.exerciseRepository.create({
            ...input,
            name: trimmedName,
            muscleGroups,
        });
    },
    async deleteExercise(id) {
        // TODO: add checks: "is exercise used in any session" etc.
        await exerciseRepository_1.exerciseRepository.deleteById(id);
    },
};
