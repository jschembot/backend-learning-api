"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../infra/db/prisma");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const topics = await prisma_1.prisma.topic.findMany({
            include: { cards: true },
        });
        res.json(topics);
    }
    catch (err) {
        console.error('GET /topics error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', async (_req, res) => {
    try {
        const { title, description, tags } = _req.body;
        if (!title) {
            return res.status(400).json({ error: 'title is required' });
        }
        const topic = await prisma_1.prisma.topic.create({
            data: {
                title,
                description: description ?? null,
                tags: tags ?? [],
            },
        });
        res.status(201).json(topic);
    }
    catch (err) {
        console.error('POST /topics error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
