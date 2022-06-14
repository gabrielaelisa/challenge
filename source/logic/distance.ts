import { IPoint } from "./distance.types";
import haversine from 'haversine-distance'
/**
 * 
 * @param pointA 
 * @param pointB 
 * @returns 
 */
export function calculateDistance(pointA: IPoint , pointB: IPoint) {

    return haversine(pointA, pointB)/1000;
    
}