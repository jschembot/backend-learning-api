"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../db/prisma");
const router = (0, express_1.Router)();
// GET /sessions
router.get('/', async (_req, res) => {
    try {
        const sessions = await prisma_1.prisma.workoutSession.findMany({
            orderBy: { date: 'desc' },
        });
        res.json(sessions);
    }
    catch (err) {
        console.error('GET /sessions error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /sessions
router.post('/', async (req, res) => {
    try {
        const { title, date, notes } = req.body ?? {};
        let parsedDate;
        if (date) {
            const d = new Date(date);
            if (Number.isNaN(d.getTime())) {
                return res.status(400).json({ error: 'Invalid date' });
            }
            parsedDate = d;
        }
        const session = await prisma_1.prisma.workoutSession.create({
            data: {
                title: title ?? null,
                // if parsedDate is undefined, Prisma uses the DB default (now)
                date: parsedDate,
                notes: notes ?? null,
            },
        });
        res.status(201).json(session);
    }
    catch (err) {
        console.error('POST /sessions error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /sessions/:id (include sets + exercise info)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const session = await prisma_1.prisma.workoutSession.findUnique({
            where: { id },
            include: {
                sets: {
                    include: {
                        exercise: true,
                    },
                    orderBy: { setIndex: 'asc' },
                },
            },
        });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    }
    catch (err) {
        console.error('GET /sessions/:id error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /sessions/:id/sets
router.post('/:id/sets', async (req, res) => {
    try {
        const { id: sessionId } = req.params;
        const { exerciseId, weight, reps, notes } = req.body ?? {};
        if (!exerciseId) {
            return res.status(400).json({ error: 'exerciseId is required' });
        }
        // Make sure the session exists
        const session = await prisma_1.prisma.workoutSession.findUnique({
            where: { id: sessionId },
        });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        // Make sure the exercise exists
        const exercise = await prisma_1.prisma.exercise.findUnique({
            where: { id: exerciseId },
        });
        if (!exercise) {
            return res.status(400).json({ error: 'Invalid exerciseId' });
        }
        // Determine next setIndex for this session
        const lastSet = await prisma_1.prisma.workoutSet.findFirst({
            where: { sessionId },
            orderBy: { setIndex: 'desc' },
        });
        const nextIndex = (lastSet?.setIndex ?? 0) + 1;
        const createdSet = await prisma_1.prisma.workoutSet.create({
            data: {
                sessionId,
                exerciseId,
                setIndex: nextIndex,
                weight: typeof weight === 'number' ? weight : null,
                reps: typeof reps === 'number' ? reps : null,
                notes: notes ?? null,
            },
            include: {
                exercise: true,
            },
        });
        res.status(201).json(createdSet);
    }
    catch (err) {
        console.error('POST /sessions/:id/sets error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
