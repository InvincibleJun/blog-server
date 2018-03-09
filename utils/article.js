/********************************
 * desc: md后续处理
*********************************/
let matchTitlte = /^(\#{1,5})\s+([^#]+)$/;

function getAnchor(text) {
  const lines = text.split('\n');
  const anchors = {}
  return lines.map((v, k) => {
    return v.replace(matchTitlte, ($1, $2, $3) => {
      return `${$2} <a name="${$3}">${$3}</a>`
    })
  }).join('\n')
}

module.exports = {
  getAnchor
}