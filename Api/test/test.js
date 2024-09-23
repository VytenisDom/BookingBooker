const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../src/index.js');

const { expect } = chai;
chai.use(chaiHttp);

describe('Meeting Room Booking API', () => {
    describe('GET /getBookings', () => {
        it('should return a list of bookings', (done) => {
            chai
            .request(app)
            .get('/getBookings')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text)).to.be.an('array');
                expect(JSON.parse(res.text).length).to.equal(1);
                done();
            });
        });
    });
    
    describe('POST /addBooking', () => {
        it('should add a new booking', (done) => {
            const newBooking = {
                topic: 'New Meeting',
                startDate: '2023-12-02 09:00',
                endDate: '2023-12-02 10:00',
                numOfParticipants: '5',
            };
    
            chai
            .request(app)
            .post('/addBooking')
            .send({ booking: newBooking })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text)).to.be.an('array');
                expect(JSON.parse(res.text).length).to.equal(2);
                done();
            });
        });
    });
    
    describe('DELETE /removeBooking/:id', () => {
        it('should remove a booking', (done) => {
            const bookingIdToDelete = 0;
    
            chai
            .request(app)
            .delete(`/removeBooking/${bookingIdToDelete}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text)).to.be.an('array');
                expect(JSON.parse(res.text).length).to.equal(1);
                done();
            });
        });
    });
    
    describe('PUT /editBooking/:id', () => {
        it('should edit a booking', (done) => {
            const bookingIdToEdit = 0; // Assuming you want to edit the first booking
            const updatedBooking = {
                topic: 'Testing PUT',
                startDate: '2023-12-04 10:00',
                endDate: '2023-12-04 11:00',
                numOfParticipants: '6',
            };
    
            chai
            .request(app)
            .put(`/editBooking/${bookingIdToEdit}`)
            .send({ booking: updatedBooking })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text)).to.be.an('array');
                expect(JSON.parse(res.text)[bookingIdToEdit]).to.deep.equal(updatedBooking);
                done();
            });
        });
    });
});
