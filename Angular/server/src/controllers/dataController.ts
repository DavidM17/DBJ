import { Request, Response } from 'express';

import pool from '../database';
class dataController{

    public async list (req: Request,res: Response){
        const data = await pool.query('SELECT * FROM coord ORDER BY id DESC LIMIT 1');
        res.json(data);

    }

    public async dates (req: Request,res: Response){
        const { date1 } =req.params;
        const { date2 } =req.params;
        const data = await pool.query("select * from *coord* where *fecha* between 'date1' and 'date2'");
        res.json(data);

    }
}

export const datacontroller = new dataController();