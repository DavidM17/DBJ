import { Request, Response } from 'express';

import pool from '../database';
class dataController{

    public async list (req: Request,res: Response){
        const data = await pool.query('SELECT * FROM coord ORDER BY id DESC LIMIT 1');
        res.json(data);

    }
}

export const datacontroller = new dataController();