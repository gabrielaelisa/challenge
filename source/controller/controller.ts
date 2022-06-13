import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import Joi from 'joi';
import Distance from '../logic/distance.model';

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


const getAddressSchema = Joi.object({
    q: Joi.string().required()
});

/**
 * Gets adress info using Nominatim API
 * @param {Request} req The request
 * @param {Response} res The response object
 * @param {NextFunction} next 
 * @returns { Response } adress info message
 */

const getAddress = async(req: Request, res: Response, next: NextFunction) => {
    await getAddressSchema.validateAsync(req.query)
    const { q } = req.query;
    const result: AxiosResponse = await axios.get(
        `${nominatimURL}/search?format=json&q=${q}`);
        return res.status(200).json({
        message: result.data
    })
}



const getHisoricalAddressesSchema = Joi.object({
    pageNumber: Joi.string().required()
});


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
const getHistoricAddresses= async(req: Request, res: Response, next: NextFunction) =>{
    await getHisoricalAddressesSchema.validateAsync(req.query);
    const { pageNumber } = req.query; 
    try{
       const documents = await Distance.getDocuments(1);
       console.log(documents)
       return res.status(200).json({
            message: documents
        });
    }
    catch(error){
        console.log(error);
    }
}



export default { getHeartbeat, getAddress, getHistoricAddresses}