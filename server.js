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
require("./app/routes/weather.routes")(app);
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

// }, 3600000)



//900000 means 15 Minutes 



var oldObj = {
  987: "sqa",
  988: "Squad"
}

var newArray = [];

for (let k in oldObj) {
  newArray.push({'id': k, 'value': oldObj[k]});
}

console.log(newArray);


var test = {
  "data": [
      {
          "coord": {
              "lon": 14,
              "lat": 50.92
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04n"
              }
          ],
          "base": "stations",
          "main": {
              "temp": 10.94,
              "feels_like": 10.07,
              "temp_min": 10,
              "temp_max": 11.67,
              "pressure": 997,
              "humidity": 80
          },
          "visibility": 10000,
          "wind": {
              "speed": 0.45,
              "deg": 103,
              "gust": 2.68
          },
          "clouds": {
              "all": 100
          },
          "dt": 1607267213,
          "sys": {
              "type": 3,
              "id": 2008644,
              "country": "DE",
              "sunrise": 1607237502,
              "sunset": 1607266739
          },
          "timezone": 3600,
          "id": 6548703,
          "name": "Struppen",
          "cod": 200
      }
  ],
  "createdAt": "2020-12-06T15:06:52.878Z",
  "updatedAt": "2020-12-06T15:06:52.878Z",
  "id": "5fccf38c315974554cc9f398"
}

var newtest = [];

for (let k in test.data) {
  newtest.push({'id': test.id, 'lfid':k, 'temp': test.data[0].main.temp});
}

console.log(newtest);
