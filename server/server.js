const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//CORS para la dirección 8081, puede variar la del cliente si se tiene una abierta en el 8081
/*var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));*/

//CORS sin mirar atrás 
app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Conexión a la base de datos
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


//Añadimos las rutas del servidor
require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
