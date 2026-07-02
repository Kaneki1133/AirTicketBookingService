const axios = require(`axios`);
const { BookingRepository } = require(`../repository/index`); 
const { FLIGHT_SERVICE_PATH } = require(`../config/serverConfig`);
const { ServiceError } = require("../utils/errors/index");

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getflightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight = await axios.get(getflightRequestURL);
            const flightData = flight.data.data;
            const priceOfTheFlight = flightData.price;
            
            //* TO Check Before booking if we actually have available seats or not 
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the Booking process', 'Insufficient seats in the flight');
            }

            const totalCost = data.noOfSeats * priceOfTheFlight;
            const bookingPayload = {...data , totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            console.log("booking Object Starts Here ", booking);

            //* Updating the Flight table for totalSeats
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`
            await axios.patch(updateFlightRequestURL , {totalSeats: flightData.totalSeats - booking.noOfSeats });
            
            //* Updating the default status value to Booked
            const updatedStatusBooking = await this.bookingRepository.update(booking.id , {status:"Booked"});  
            return updatedStatusBooking;
        } catch (error) {
            if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;
