import { Request, Response } from 'express';

import pool from '../database';
class dataController{

    public async list (req: Request,res: Response){
        const data = await pool.query('SELECT * FROM coord ORDER BY id DESC LIMIT 1');
        res.json(data);

    }

    public async dates (req: Request,res: Response){

        const date1=req.params.date1;
        const hour1=req.params.hour1;
        const date2=req.params.date2;
        const hour2=req.params.hour2;
        const type="SELECT * FROM coord WHERE fecha >= '"+date1+" "+hour1+"' AND fecha <= '"+date2+" "+hour2+"'";
        const data = await pool.query(type);
        res.json(data);
        

    }
}

export const datacontroller = new dataController();