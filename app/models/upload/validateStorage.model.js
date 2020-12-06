module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: String,
      date: Date,
      product: {
        importString: String,
        importID: String,
        validated: Boolean
      },
      warehouse: {
        importString: String,
        importID: String,
        validated: Boolean
      },
      gross_weight: String,
      nett_weight: Number,
      field: {
        importString: String,
        importID: String,
        validated: Boolean
      },
      trailer: {
        importString: String,
        importID: String,
        validated: Boolean
      },
      traktor: {
        importString: String,
        importID: String,
        validated: Boolean
      },
      user: Number,

      kontraktNr: {
        importString: String,
        importID: String,
        validated: Boolean
      },
      company: {
        importString: String,
        importID: String,
        validated: Boolean
      },
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ValidateStorage = mongoose.model("validateStorage", schema);
  return ValidateStorage;
};
