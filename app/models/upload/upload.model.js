const Import = require('./validateKontrakte.model.js');

module.exports = mongoose => {


  var schema = mongoose.Schema(
    {
      importFILE: String,
      company: String,
      user: String,
      importtype: String,
      any: []
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Upload = mongoose.model("upload", schema);
  return Upload;
};
