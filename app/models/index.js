const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.weathers = require("./weather.model.js")(mongoose);
db.todos = require("./test/todo.model.js")(mongoose);

db.storages = require("./movement/storage.model.js")(mongoose);
db.balances = require("./movement/balance.model.js")(mongoose);
//db.moves = require("./movement/move.model.js")(mongoose);

db.user = require("./auth/user.model");
db.role = require("./auth/role.model");
db.companys = require("./auth/company.model")(mongoose);

db.products = require("./master_data/product.model")(mongoose);
db.fields = require("./master_data/field.model")(mongoose);
db.warehouses = require("./master_data/warehouse.model")(mongoose);
db.traktors = require("./master_data/traktor.model")(mongoose);
db.trailer = require("./master_data/trailer.model")(mongoose);


db.uploads = require("./upload/upload.model")(mongoose);
db.validateKontraktes = require("./upload/validateKontrakte.model")(mongoose);
db.validateStorages = require("./upload/validateStorage.model")(mongoose);
db.kontrakts = require("./kontrakte/kontrakte.model")(mongoose);
db.retailers = require("./master_data/retailer.model")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
