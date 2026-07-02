const { BookingService } = require(`../service/index`);
const { StatusCodes } = require(`http-status-codes`);
const bookingService = new BookingService();

const create = async (req , res) =>{
    try {
        const response = await bookingService.createBooking(req.body);
        console.log("FROM Booking Controller ", response);
        return res.status(StatusCodes.OK).json({
            success: true,
            message:"SuccessFully Booking completed",
            err:{},
            data:response
        });
    } catch (error) {
        return res.status(error.statusCodes).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
}
module.exports ={
    create,
}