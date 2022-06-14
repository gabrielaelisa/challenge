import { IPoint } from "./distance.types";
import haversine from 'haversine-distance'
/**
 * 
 * @param pointA 
 * @param pointB 
 * @returns 
 */
export function calculateDistance(pointA: IPoint , pointB: IPoint) {

    return parseFloat((haversine(pointA, pointB)/1000).toFixed(4));
    
}