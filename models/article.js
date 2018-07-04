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
    anchors: {
      type: Array
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array
    },
    // 最后更新事件
    updateTime: {
      type: Date
    },
    createTime: {
      type: Date,
      default: Date.now
    }
  },
  methods: {
    getAll() {}
  }
};
