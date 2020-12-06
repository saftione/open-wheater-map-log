module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      short_name: String,
      unit: String,
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
      },
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Products = mongoose.model("product", schema);
  return Products;
};
