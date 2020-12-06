module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      weight: Number,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
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

  const Balance = mongoose.model("balance", schema);
  return Balance;
};
