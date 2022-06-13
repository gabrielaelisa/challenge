import chai from 'chai';
import { calculateDistance } from '../../source/logic/distance';

describe('logic', function() {

    it('distance',  function() {
        const a = { latitude: 37.8136, longitude: 144.9631 }
        const b = { latitude: 33.8650, longitude: 151.2094 }
 
        const result =  calculateDistance(a, b) 
        chai.expect(result).to.equal(714.5);
    });
});