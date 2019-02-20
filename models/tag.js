module.exports = {
  name: 'tag',
  schema: {
    name: {
      type: String,
      unique: true
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    createTime: {
      type: Date,
      default: Date.now
    },
    color: {
      type: String,
      default: '#ccc'
    }
  }
};
