import express from 'express';
import cors from 'cors';
import topicsRouter from './api/topics';
import exercisesRouter from './api/exercises';
import sessionsRouter from './api/sessions';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Mount the topics routes under /topics
app.use('/topics', topicsRouter);
app.use('/exercises', exercisesRouter); 
app.use('/sessions', sessionsRouter);

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
