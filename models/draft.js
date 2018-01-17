module.exports = {
  name: "draft",
  schema: {
    title: {
      type: String,
      unique: true
    },
    body: {
      type: String
    },
    createTime: {
      type: Date,
      default: Date.now()
    }
  }
};