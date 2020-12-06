module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      licens_plate: String,
      weight: Number,
      intern_extern: Number,
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
      },
      description: String,
      active: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Traktor = mongoose.model("traktor", schema);
  return Traktor;
};
