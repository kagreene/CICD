import type { Request, Response } from 'express';
// import question model
import Question from '../models/Question.js';

// gets a set of random questions
export const getRandomQuestions = async (_req: Request, res: Response) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: 10 } },
      { $project: { __v: 0 } }]);
    res.status(200).json(questions);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
