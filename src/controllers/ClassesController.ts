import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/converthourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: String;
  to: String;
}

export default class ClassesController {
  public show = async (req:Request, res: Response) => {
    const filters = req.query;

    const subject = filters.subject as String;
    const week_day = filters.week_day as String;
    const time = filters.time as String;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filter to search classes',
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return res.json(classes);
  }

  public create = async (req:Request, res:Response) => {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = req.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classesSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      }));

      await trx('class_schedule').insert(classesSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Unexpected error while creating new class',
      });
    }
  }
}
