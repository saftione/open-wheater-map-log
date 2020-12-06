module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      kontraktNr: String,
      kontraktCompany: String,
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
      total_weight: Number,
      user: Number,
      money: String,
      totalmoney: String,
      harvestYear: String,
      pickupDate: String,
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

  const ValidateKontrakte = mongoose.model("validateKontrakte", schema);
  return ValidateKontrakte;
};
