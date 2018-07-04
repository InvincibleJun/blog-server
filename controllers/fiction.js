const charset = require('superagent-charset');
const request = charset(require('superagent'));
const urlencode = require('urlencode-gb2312-ignore');
const cheerio = require('cheerio');

/**
 * 查询列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function search(req, res, next) {
  const { key } = req.query;
  // 模拟查询时间
  const searchTime = (+new Date()).toString().slice(0, 10) - 120;
  // gb2312编码处理
  const keyGB2312 = urlencode(key, 'gb2312');

  request
    .get(`https://www.7kshu.com/modules/article/search.php?searchtype=articlename&searchkey=${keyGB2312}`)
    .charset('gbk')
    .set('Cookie', `jieqiVisitTime=jieqiArticlesearchTime%3D${searchTime}`)
    .set(
      'Accept',
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    )
    .set(
      'User-Agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    )
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .then((response) => {
      // 数据处理
      const $ = cheerio.load(response.text);
      const res = [];
      $('#centerm tbody tr')
        .filter('tr[align!=center]')
        .map((i, el) => {
          // 查询得结果
          const tds = $(el).find('td');
          res.push({
            href: tds
              .eq(1)
              .find('a')
              .attr('href'),
            title: tds.eq(0).text(),
            last: tds.eq(1).text(),
            auth: tds.eq(2).text(),
            words: tds.eq(3).text(),
            lastTime: tds.eq(4).text(),
            status: tds.eq(5).text()
          });

          return el;
        });

      next({ data: res });
    });
}

async function getChapterList(req, res, next) {
  const { href } = req.query;
  const path = href.replace(/index\.html/, '');
  request
    .get(href)
    .charset('gbk')
    .then((response) => {
      const $ = cheerio.load(response.text);
      const data = [];
      $('#chapterlist li').map((i, el) => {
        const tag = $(this).find('li a');
        res.push({
          title: tag.text(),
          href: path + tag.attr('href')
        });
        return el;
      });
      next({ data });
    });
}

async function getOneChapter(req, res, next) {
  const { href } = req.query;
  request
    .get(href)
    .charset('gbk')
    .then((response) => {
      const article = {};
      const $ = cheerio.load(response.text);
      const t = $('#content')
        .text()
        .replace(/复制本地址浏览[\%\dA-z]+/g, '')
        .replace(/\s+/g, '<br><br>');
      article.content = t;
      article.title = $('#main h1').text();
      article.prev = $('#previewpage').attr('href');
      article.next = $('#nextpage').attr('href');
      next({ data: article });
    });
}

module.exports = {
  search,
  getChapterList,
  getOneChapter
};
