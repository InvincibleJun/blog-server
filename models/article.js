module.exports = {
  name: 'article',
  schema: {
    title: {
      type: String,
      unique: true
    },
    body: {
      type: String
    },
    desc: {
      type: String
    },
    draftID: {
      type: String
    },
    anchors: {
      type: Array
    },
    tags: {
      type: Array
    },
    createTime: {
      type: Date,
      default: Date.now
    }
  },
  methods: {
    getAll() {}
  }
}
