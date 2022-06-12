import { Request, Response, NextFunction } from 'express';
//import axios, { AxiosResponse } from 'axios';

/**
 * Gets the API heartbeat
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns { Response } heartbeat message
 */

const getHeartbeat = async(req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    console.log(res);
    console.log(next);
    return res.status(200).json({
        message: 'heartbeat'
    });
}


export default { getHeartbeat}