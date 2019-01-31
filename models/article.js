const { Schema } = require('mongoose');

module.exports = {
  name: 'article',
  schema: {
    // 标题
    title: {
      type: String,
      unique: true
    },

    // md主文件
    body: {
      type: String
    },

    // 简述
    desc: {
      type: String
    },

    // 是否删除
    isDelete: {
      type: Boolean,
      default: false
    },

    // 是否发布
    isPublished: {
      type: Boolean,
      default: false
    },

    // 标签列表
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: 'tag' }]
    },

    // 最后更新事件
    updateTime: {
      type: Date,
      default: Date.now
    },

    // 创建时间
    createTime: {
      type: Date,
      default: Date.now
    }
  }
  // methods: {
  //   getAll() {}
  // }
};
