const { decode } = require('entities');
const cheerio = require('cheerio');


function makeCheerio(ori) {
  const decodedText = decode(ori
    .replace(/class="md"/g, '')
    .replaceAll(/\n/g, '')
  );
  const html = cheerio.load(decodedText)
  html('a').remove()
  return html;
}

const sanitizedHtml  = (ori) => {
  const html = makeCheerio(ori);
  return html('html').html()
}



const extractPageOfPost = (post) => {

  const html = makeCheerio(post.selftext_html ?? '');
  if (html('p').length) {
    return {
      title:  post.title,
      author:  post.author,
      created: new Date(post.created * 1000),
      created_at: post.created,
      content: sanitizedHtml(post.selftext_html ?? '')
    }
  }
  return  null

}
export  {
  extractPageOfPost
}
