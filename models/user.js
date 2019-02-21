module.exports = {
  name: 'user',
  schema: {
    name: {
      type: String,
      unique: true
    },
    account: {
      type: String,
      unique: true
    },
    isRoot: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    password: {
      type: String
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    createTime: {
      type: Date,
      default: Date.now
    }
  }
};
