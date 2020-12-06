module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      },
      warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'warehouse'
      },
      gross_weight: Number,
      nett_weight: Number,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
      },
      field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'field'
      },
      trailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trailer'
      },
      traktor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'traktor'
      },  
      kontraktNr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kontrakte'
      },
      removal: {
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

  const Storage = mongoose.model("storage", schema);
  return Storage;
};
