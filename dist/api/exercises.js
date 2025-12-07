"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exerciseService_1 = require("../application/exercises/exerciseService");
const router = (0, express_1.Router)();
// GET /exercises
router.get('/', async (_req, res) => {
    try {
        const exercises = await exerciseService_1.exerciseService.listExercises();
        res.json(exercises);
    }
    catch (err) {
        console.error('GET /exercises error:', err);
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
});
// POST /exercises
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const created = await exerciseService_1.exerciseService.createExercise({
            name: body.name ?? '',
            muscleGroups: body.muscleGroups ?? [],
            equipment: body.equipment ?? null,
            notes: body.notes ?? null,
        });
        res.status(201).json(created);
    }
    catch (err) {
        console.error('POST /exercises error:', err);
        if (err instanceof Error && /required/i.test(err.message)) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(500).json({ error: 'Failed to create exercise' });
    }
});
// DELETE /exercises/:id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await exerciseService_1.exerciseService.deleteExercise(id);
        res.status(204).end();
    }
    catch (err) {
        console.error('DELETE /exercises/:id error:', err);
        res.status(500).json({ error: 'Failed to delete exercise' });
    }
});
exports.default = router;
