/********************************
 * desc: md后续处理
 *********************************/
let matchTitlte = /^(\#{1,5})\s+([^#]+)$/;
let matchDesc = /\#{3}\s+导语\n([^#]+)\n/;
function addAnchorAndMenu(text) {
  // 锚点
  const anchors = [];
  const menu = [];
  const tmp = null;
  const md = text
    .split("\n")
    .map((v, k) => {
      return v.replace(matchTitlte, ($1, $2, $3) => {
        anchors.push({ level: $2.length, title: $3 });
        return `${$2} <a name="${$3}">${$3}</a>`;
      });
    })
    .join("\n");
  return { md, anchors };
}

function getDesc(text) {
  const match = text.match(matchDesc);
  return match ? match[1] : "";
}

module.exports = {
  getDesc,
  addAnchorAndMenu
};
