import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';


const nominatimURL = 'https://nominatim.openstreetmap.org';

/**
 * Gets the API heartbeat
 * @param {Request} req The request
 * @param {Response} res The response object
 * @param {NextFunction} next 
 * @returns { Response } heartbeat message
 */

const getHeartbeat = async(req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'heartbeat'
    });
}

/**
 * Gets adress info using Nominatim API
 * @param {Request} req The request
 * @param {Response} res The response object
 * @param {NextFunction} next 
 * @returns { Response } adress info message
 */

const getAddress = async(req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;
    const result: AxiosResponse = await axios.get(
        `${nominatimURL}/search?format=json&q=${q}`);
    res.status(200).json({
        message: result.data
    })
}




export default { getHeartbeat, getAddress}