import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import Joi from 'joi';
import Distance from '../logic/distance.model';
import { calculateDistance } from '../logic/distance';

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
    try{

        const result: AxiosResponse = await axios.get(
            `${nominatimURL}/search?format=json&q=${q}`);
        return res.status(200).json({
            message: result.data
        })
    }
    catch(error){
        console.log(error);
    }
   
}

const getDistanceSchema = Joi.object({
    origin: Joi.string().required(),
    destination: Joi.string().required(),
});


/**
 * Gets the distance between two addresses, in kilometers
 * and saves in database
 * @param {Request} req The request
 * @param {Response} res The response object
 * @param {NextFunction} next 
 */
const postDistance = async(req: Request, res: Response, next: NextFunction) => {
    await getDistanceSchema.validateAsync(req.query)
    const { origin, destination } = req.query;

    console.log(origin);
    try{
        const originResult: AxiosResponse = await axios.get(
            `${nominatimURL}/search?format=json&q=${origin}`);

        const destinationResult: AxiosResponse = await axios.get(
            `${nominatimURL}/search?format=json&q=${destination}`);

        console.log(originResult.data);
        const originPoint = { 
            latitude: originResult.data[0].lat,
            longitude: originResult.data[0].lon,
        }
        const destinationPoint = { 
            latitude: destinationResult.data[0].lat,
            longitude: destinationResult.data[0].lon,
        }

        const distance = calculateDistance(originPoint, destinationPoint);
        
        await Distance.create({
            origin,
            destination,
            distance,
        });

        return res.status(200).json({
            message: { distance }
        })
    }
    catch(error){
        return res.status(500).send({error :'Something went wrong' })
    }
   
}

const getAddressStructruedSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
});

/**
 * Gets adress info using Nominatim API
 * using Structured params
 * @param {Request} req The request
 * @param {Response} res The response object
 * @param {NextFunction} next 
 * @returns { Response } adress info message
 */

 const getAddressStructured = async(req: Request, res: Response, next: NextFunction) => {
    await getAddressStructruedSchema.validateAsync(req.query)
    const { street, city, country } = req.query;
    try{

        const result: AxiosResponse = await axios.get(
            `${nominatimURL}/search?format=json&street=${street}&city=${city}&country=${country}`);
            return res.status(200).json({
            message: result.data
        })
    }
    catch(error){
        console.log(error);
    }
}

const getHisoricalAddressesSchema = Joi.object({
    pageNumber: Joi.string().required()
});

/**
 * Gets Historical Addresses consulted
 * @param {Request} req The request
 * @param {Response} res The response object
 * @param {NextFunction} next 
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


export default { 
    getHeartbeat,
    getAddress,
    getHistoricAddresses,
    getAddressStructured,
    postDistance
}