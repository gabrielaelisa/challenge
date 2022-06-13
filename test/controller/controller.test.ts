import chai from 'chai';
import chaiHttp from 'chai-http';


describe('controller', function() {

    const url= 'http://localhost:3000';
    chai.use(chaiHttp);

    it('heartbeat', async function() {
        const heartbeat = await chai.request(url)
        .get('/heartbeat')
        .set('Authorization', 'Bearer legit')

        chai.expect(heartbeat.body).to.deep.equal(
            {
                message: 'heartbeat'
            }
        )
    });
});