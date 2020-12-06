module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      kontraktNr: String,
      retailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'retailer'
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      },
      warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'warehouse'
      },
      total_weight: Number,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      money: Number,
      totalmoney: Number,
      harvestYear: String,
      pickupDate: Date,
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
      },
      transacted: Boolean,
      deleted: Boolean,
      description: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const  Kontrakte = mongoose.model("kontrakte", schema);
  return Kontrakte;
};
