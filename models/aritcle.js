module.exports = {
  name: "aritcle",
  schema: {
    title: {
      type: String,
      unique: true
    },
    body: {
      type: String
    },
    createAt: {
      type: Date,
      default: Date.now()
    }
  },
  methods: {
    getAll() {}
  }
};
