"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const topics_1 = __importDefault(require("./api/topics"));
const exercises_1 = __importDefault(require("./api/exercises"));
const sessions_1 = __importDefault(require("./api/sessions"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/topics', topics_1.default);
app.use('/exercises', exercises_1.default);
app.use('/sessions', sessions_1.default);
const PORT = process.env.PORT ?? 3001;
