module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      },
      max_weight: Number,
      unit: Number,
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
      },
      actions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'storage'
      },
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Warehouse = mongoose.model("warehouse", schema);
  return Warehouse;
};
