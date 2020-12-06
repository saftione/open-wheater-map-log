
//create and export the model

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        content: String,
        done: Boolean
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Todo = mongoose.model("todo", schema);
    return Todo;
  };
  