
module.exports = app => {

    const multer = require('multer');

    const uploads = require("../../controllers/upload/upload.controller.js");

    var router = require("express").Router();

    router.post("/", uploads.create);

    // Retrieve all Tutorials
    router.get("/", uploads.findAll);

    // Retrieve all published Tutorials
    router.get("/published", uploads.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", uploads.findOne);

    // Update a Tutorial with id
    router.put("/:id", uploads.update);

    // Delete a Tutorial with id
    router.delete("/:id", uploads.delete);

    // Create a new Tutorial
    router.delete("/", uploads.deleteAll);

    router.delete("/", uploads.deleteAll);

    global.__basedir = __dirname;

    // -> Multer Upload Storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __basedir + '/../upload/')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
        }
    });

    const upload = multer({ storage: storage });
    // router.post('/', upload.single('file')
    //router.post("/multiple-upload", upload.single("file"), uploadController.uploadfile);
    // -> Express Upload RestAPIs


    router.post("/multiple-upload", upload.single("file"), uploads.createupload);





    app.use("/api/uploads/", router);
};
