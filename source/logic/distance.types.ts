import { Document, Model } from 'mongoose';

export interface IPoint {
    latitude: number,
    longitude: number
}

export interface IDistance {
    origin: string,
    destination: string,
    distance: number,
}

export interface IDistanceDocument extends IDistance, Document {

}

export interface IDistanceModel extends Model<IDistanceDocument> {
    
}