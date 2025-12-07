import { Router, Request, Response } from 'express';
import { exerciseService } from '../application/exercises/exerciseService';
import type { CreateExerciseInput } from '../domain/exercises';

const router = Router();

// GET /exercises
router.get('/', async (_req: Request, res: Response) => {
  try {
    const exercises = await exerciseService.listExercises();
    res.json(exercises);
  } catch (err) {
    console.error('GET /exercises error:', err);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// POST /exercises
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body as Partial<CreateExerciseInput>;

    const created = await exerciseService.createExercise({
      name: body.name ?? '',
      muscleGroups: body.muscleGroups ?? [],
      equipment: body.equipment ?? null,
      notes: body.notes ?? null,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error('POST /exercises error:', err);

    if (err instanceof Error && /required/i.test(err.message)) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.status(500).json({ error: 'Failed to create exercise' });
  }
});

// DELETE /exercises/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await exerciseService.deleteExercise(id);
    res.status(204).end();
  } catch (err) {
    console.error('DELETE /exercises/:id error:', err);
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
});

export default router;
