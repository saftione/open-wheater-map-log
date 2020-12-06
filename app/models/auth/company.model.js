module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      type: Number, 
      admin_user: Number,
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

  const Company = mongoose.model("company", schema);
  return Company;
};
