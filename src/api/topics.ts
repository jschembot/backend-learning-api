import { Router, Request, Response } from 'express';
import { prisma } from '../infra/db/prisma';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const topics = await prisma.topic.findMany({
      include: { cards: true },
    });

    res.json(topics);
  } catch (err) {
    console.error('GET /topics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (_req: Request, res: Response) => {
  try {
    const { title, description, tags } = _req.body;

    if (!title) {
      return res.status(400).json({ error: 'title is required' });
    }

    const topic = await prisma.topic.create({
      data: {
        title,
        description: description ?? null,
        tags: tags ?? [],
      },
    });

    res.status(201).json(topic);
  } catch (err) {
    console.error('POST /topics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
