import { Request, Response } from 'express';

import db from '../database/connection';

export default class ClassesController {
  public index = async (req: Request, res: Response) => {
    const totalconnections = await db('connections').count('* as total');

    const { total } = totalconnections[0];

    return res.json({ total });
  }

  public create = async (req: Request, res: Response) => {
    const { user_id } = req.body;

    await db('connections').insert({
      user_id,
    });

    return res.status(201).send();
  }
}
