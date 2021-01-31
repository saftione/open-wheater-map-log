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


function loadWheatherSt() {
  let lon = "14.001417";
  let lat = "50.917169";
  query = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + process.env.OpenAPiKey + "";
  let poly = "5fce1ee6714b5249e9e1e1e5";
  querypoly = "http://api.agromonitoring.com/agro/1.0/soil?polyid=" + poly + "&appid=" + process.env.OpenAPiKey + "";
  loadData(query,querypoly);
}

function loadWheatherCa() {
  let lon = "14.276035";
  let lat = "51.286799";
  query = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + process.env.OpenAPiKey + "";
  let poly = "5fce53dc714b5249cce1e246";
  querypoly = "http://api.agromonitoring.com/agro/1.0/soil?polyid=" + poly + "&appid=" + process.env.OpenAPiKey + "";
  loadData(query,querypoly);

}


function loadData(oQuery,oQuerySoil) {
  var Air, Soil;

  fetch(oQuery)
    .then(function (response) {
      // Get a JSON object from the response
      // This is a weird quirk of Fetch
      return response.json();
    }).then(function (data) {

      // Log the data to the console
      // console.log("sd", data);

      // Cache the data to a variable
      Air = data;

      // Make another API call and pass it into the stream
      return fetch(oQuerySoil);

    }).then(function (response) {
      // Get a JSON object from the response
      return response.json();
    }).then(function (data) {

      // Log the data to the console
      // console.log("sds", data);

      // Cache the data to a variable
      Soil = data;
      // console.log("sdss", Air, Soil);
      // Now that you have both APIs back, you can do something with the data
      const db = require("./app/models");
      const Weather = db.weathers;

      NewAir = {
        "main": Air.main,
        "visibility": Air.visibility,
        "wind": Air.wind,
        "clouds": Air.clouds,
        "rain": Air.rain,
        "snow": Air.snow,
        "dt": Air.dt,
      };
      NewSoil = {
        "dt": Soil.dt,
        "t10": Soil.t10-273.15,
        "moisture": Soil.moisture,
        "t0": Soil.t0-273.15
      };


      const weather = new Weather({
        place: Air.name,
        dataAir: NewAir,
        dataSoil: NewSoil
      });
      
      
      weather
        .save(weather)
        .catch(err => {
          console.log(err);
        });

    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });


}
//  loadWheatherSt();
//  loadWheatherCa();


setInterval(function () {
  console.log("saved Weather");
  loadWheatherSt();
  loadWheatherCa();

}, 36000)

//  function saveData(oResult,oResultSoil){
//   

//900000 means 15 Minutes 
// http://api.agromonitoring.com/agro/1.0/polygons?appid=35fc246f168ed2345ed8c923298cf776
// [{ "id": "5fce1ee6714b5249e9e1e1e5", "geo_json": { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[[14.000977, 50.917742], [14.000696, 50.916572], [14.001881, 50.91646], [14.002104, 50.91755], [14.000977, 50.917742]]] } }, "name": "struppen", "center": [14.0014145, 50.917081], "area": 1.0504, "user_id": "5fcce4d43da20c0007574d98", "created_at": 1607343846 }]

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


