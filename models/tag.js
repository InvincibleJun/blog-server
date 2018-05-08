module.exports = {
  name: 'tag',
  schema: {
    name: {
      type: String,
      unique: true
    },
    num: {
      type: Number,
      default: 0
    },
    draftId: {
      type: Array
    }
  }
}
