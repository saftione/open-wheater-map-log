module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      },
      field_nr: Number,
      field_nr_short: Number,
      area: Number,
      coordinates: Number,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
      },
      visible: Boolean
    },
    { timestamps: true }
  );

  

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Field = mongoose.model("field", schema);
  return Field;
};
