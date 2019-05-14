import { Request, Response } from 'express';

import pool from '../database';
class dataController{

    public async list (req: Request,res: Response){
        const data = await pool.query('SELECT * FROM coord ORDER BY id DESC LIMIT 1');
        const data2 = await pool.query('SELECT * FROM coord2 ORDER BY id DESC LIMIT 1');
        const datar = { carro1: data , carro2 : data2};
        res.json(datar);

    }

    public async dates (req: Request,res: Response){

        const date1=req.body.date1;
        const hour1=req.body.hour1;
        const date2=req.body.date2;
        const hour2=req.body.hour2;
        const type="SELECT * FROM coord WHERE fecha >= '"+date1+" "+hour1+"' AND fecha <= '"+date2+" "+hour2+"'";
        const type2="SELECT * FROM coord2 WHERE fecha >= '"+date1+" "+hour1+"' AND fecha <= '"+date2+" "+hour2+"'";
        
        const data1 = await pool.query(type);
        const data2 = await pool.query(type2);
        res.json({carro1:data1,carro2:data2});
        

    }
}

export const datacontroller = new dataController();