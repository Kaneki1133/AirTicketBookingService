const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const { PORT } = require(`../src/config/serverConfig`);

const apiRoutes = require(`./routes/index`);
const db = require(`./models/index`);

const setupAndStartServer = async () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use(`/api`, apiRoutes);

    app.listen(PORT , ()=>{
        console.log(`Server Started On Port ${PORT} `);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    });
}

setupAndStartServer();