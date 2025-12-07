import { Router } from 'express';
import { prisma } from '../db/prisma';

const router = Router();

// GET /exercises
router.get('/', async (_req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      orderBy: { name: 'asc' },
    });

    res.json(exercises);
  } catch (err) {
    console.error('GET /exercises error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /exercises
router.post('/', async (req, res) => {
  try {
    const { name, muscleGroups, equipment, notes } = req.body ?? {};

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const exercise = await prisma.exercise.create({
      data: {
        name,
        muscleGroups: muscleGroups,
        equipment: equipment ?? null,
        notes: notes ?? null,
      },
    });

    res.status(201).json(exercise);
  } catch (err) {
    console.error('POST /exercises error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
