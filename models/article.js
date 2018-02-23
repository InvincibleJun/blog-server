module.exports = {
  name: "article",
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
  },
  methods: {
    getAll() {}
  }
};
