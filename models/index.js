const Mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const mdb = {
  Types: Mongoose.Types
};

Mongoose.Promise = require('bluebird');

Mongoose.connect('mongodb://120.78.222.240:27017/jarvan', { useMongoClient: true }, (err) => {
  if (err) {
    console.log('mongodb connect error');
  } else {
    console.log('mongodb success');
  }
});

fs.readdirSync(path.resolve(__dirname)).forEach((file) => {
  // 判断是否js文件
  if (file === 'index.js' || !/\.js$/.test(file)) return;
  const { name, schema, methods } = require(path.join(__dirname, file));
  mdb[name] = Mongoose.model(name, schema);
  const model = mdb[name];
  _.forEach(methods, (fn, name) => {
    model[name] = function () {
      return fn.apply(model, arguments);
    };
  });
});

module.exports = mdb;
