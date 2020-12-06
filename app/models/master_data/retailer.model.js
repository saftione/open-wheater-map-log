module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      address: {
        name: String,
        zip: String,
        ort: String,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Retailer = mongoose.model("retailer", schema);
  return Retailer;
};
