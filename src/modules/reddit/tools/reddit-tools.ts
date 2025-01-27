import { extractPageOfPost } from '../../../provider/reddit/tools';

const clearPost = (body: any[]) => {
  const clearedPost = [];
  body.forEach((item) => {
    const p = extractPageOfPost(item.data);
    if (p === null) return;
    clearedPost.push(p);
  });
  clearedPost.sort((a, b) => {
    return a.created - b.created;
  });
  return clearedPost;
};

const createTempEpub = (
  clearedPost: any[],
  df: { title: string; author: string },
) => {
  return {
    title: clearedPost.length > 0 ? clearedPost[0].title : df.title,
    author: clearedPost.length > 0 ? clearedPost[0].author : df.author,
    content: clearedPost,
  };
};
export { clearPost, createTempEpub};
