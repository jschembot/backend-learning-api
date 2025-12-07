"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionService = void 0;
const sessionRepository_1 = require("../../infra/repositories/sessionRepository");
const workoutSetRepository_1 = require("../../infra/repositories/workoutSetRepository");
exports.sessionService = {
    async listSessions() {
        return sessionRepository_1.sessionRepository.findAll();
    },
    async createSession(input) {
        return sessionRepository_1.sessionRepository.create(input);
    },
    async deleteSession(id) {
        await sessionRepository_1.sessionRepository.deleteById(id);
    },
    async listSetsForSession(sessionId) {
        return workoutSetRepository_1.workoutSetRepository.findBySession(sessionId);
    },
    async addSetToSession(sessionId, input) {
        return workoutSetRepository_1.workoutSetRepository.create(sessionId, input);
    },
    async deleteSet(setId) {
        await workoutSetRepository_1.workoutSetRepository.delete(setId);
    },
};
