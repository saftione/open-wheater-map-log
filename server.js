require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const fetch = require("node-fetch");
// 0 = deploy
var flag = 0;

const app = express();

var corsOptions = {
  //origin: "http://127.0.0.1:8081"
  origin: "http://localhost:8081"
};

if (flag == 1) {
  app.use(cors(corsOptions));
} if (flag == 0) {
  app.use(cors());
  // Set Static Folder
  app.use(express.static(path.join(__dirname, 'public')));

}




// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //  initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

/* simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lagerhub application." });
});
*/
// routes
require("./app/routes/auth/auth.routes")(app);
require("./app/routes/auth/user.routes")(app);

require("./app/routes/turorial.routes")(app);
require("./app/routes/todo.routes")(app);



console.log(`${db}`);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function loadWheather() {
  let lon = "14.001417";
  let lat = "50.917169";
  query = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + process.env.OpenAPiKey + "";
  loadData(query);
}


function loadData(oQuery) {

  return fetch(oQuery, {
    "body": oQuery,
    "method": "POST"
  }).then(res => res.json()).then(oResult => {
    console.log(new Date());
    const db = require("./app/models");
    const Weather = db.weathers;

    const weather = new Weather({
      data: oResult,
    });

    weather
      .save(weather)
      .catch(err => {
       console.log(err);
      });

  }).catch(e => {
    console.error(e);
  });


}


// setInterval(function () {
//   console.log("saved Weather");
//   loadWheather();

// }, 1000)



//900000 means 15 Minutes 