const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const { PORT } = require(`../src/config/serverConfig`);

const apiRoutes = require(`./routes/index`);
const db = require(`./models/index`);

const setupAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(`/api`, apiRoutes);

    app.use('/api/v1/home' , (req , res) => {
        //console.log(toString(req.params.query));
        return res.json({message:"Hitting The BookingService "});
    } )

    app.listen(PORT, () => {
        console.log(`Server Started for BookingService On Port ${PORT} `);

        //* console.log(typeof process.env.DB_SYNC);   beacuse typeOf is String so has to do == 'true'
        if (process.env.DB_SYNC == 'true') {
            db.sequelize.sync({ alter: true });
        }

        console.log("Booking Service Server");
    });
}

setupAndStartServer();