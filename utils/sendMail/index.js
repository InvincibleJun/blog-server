const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// 开启一个 SMTP 连接池
const transport = nodemailer.createTransport(smtpTransport({
  host: "smtp.qq.com", // 主机
  secure: true, // 使用 SSL
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: "1164045517@qq.com", // 账号
    pass: "raxkrfwoelqcfhce" // 密码
  }
}));

// 设置邮件内容
const mailOptions = {
  from: "Jarvan's Blog<1164045517@qq.com>", // 发件地址
  to: "398955404@qq.com", // 收件列表
  subject: "你的验证码", // 标题
  text: "",
  // html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
}

async function sendMail(to, text) {
  const newOptions = { ...mailOptions, to, text };
  await transport.sendMail(newOptions);
  transport.close(); // 如果没用，关闭连接池
}

module.exports = sendMail;


// module.exports = sendMail;
