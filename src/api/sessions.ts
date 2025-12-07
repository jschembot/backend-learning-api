import { Router, Request, Response } from "express";
import { sessionService } from "../application/sessions/sessionService";
import type {
  CreateWorkoutSessionInput,
  CreateWorkoutSet,
} from "../domain/sessions";

const router = Router();

/**
 * GET /sessions
 * List all sessions
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const sessions = await sessionService.listSessions();
    res.json(sessions);
  } catch (err) {
    console.error("GET /sessions error:", err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

/**
 * POST /sessions
 * Create a new session
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body as Partial<CreateWorkoutSessionInput>;

    const created = await sessionService.createSession({
      title: body.title ?? "Missing Workout Session Title",
      date: body.date ? new Date(body.date) : undefined,
      notes: body.notes ?? null,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("POST /sessions error:", err);
    res.status(500).json({ error: "Failed to create workout session" });
  }
});

/**
 * DELETE /sessions/:id
 * Delete a session (and maybe sets via service if you choose)
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await sessionService.deleteSession(id);
    res.status(204).end();
  } catch (err) {
    console.error("DELETE /sessions/:id error:", err);
    res.status(500).json({ error: "Failed to delete session" });
  }
});

/**
 * GET /sessions/:id/sets
 * List sets for a session
 */
router.get("/:id/sets", async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;
    const sets = await sessionService.listSetsForSession(sessionId);
    res.json(sets);
  } catch (err) {
    console.error("GET /sessions/:id/sets error:", err);
    res.status(500).json({ error: "Failed to fetch sets" });
  }
});

/**
 * POST /sessions/:id/sets
 * Add a set to a session
 */
router.post("/:id/sets", async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;
    const body = req.body as Partial<CreateWorkoutSet>;

    const created = await sessionService.addSetToSession(sessionId, {
      exerciseId: body.exerciseId as string,
      weight: body.weight ?? null,
      reps: body.reps ?? null,
      notes: body.notes ?? null,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("POST /sessions/:id/sets error:", err);
    res.status(500).json({ error: "Failed to create set" });
  }
});

/**
 * DELETE /sessions/:sessionId/sets/:setId
 */
router.delete(
  "/:sessionId/sets/:setId",
  async (req: Request, res: Response) => {
    try {
      const { setId } = req.params;
      await sessionService.deleteSet(setId);
      res.status(204).end();
    } catch (err) {
      console.error("DELETE /sessions/:sessionId/sets/:setId error:", err);
      res.status(500).json({ error: "Failed to delete set" });
    }
  }
);

export default router;
