import { AppThunk } from '../redux/store.ts';
import { articlesSlice, Article } from '../redux/articles.slice.ts';

export const requestArticles =
  (page: number = 1): AppThunk =>
  (dispatch, _, { api }) => {
    const offset = (page - 1) * 20;
    api
      .getArticles(offset)
      .then((response) => {
        const articles = response.articles.map(
          (article) =>
            ({
              id: article.slug,
              title: article.title,
              tags: article.tagList,
              text: article.body ? article.body : '',
              author: article.author.username,
              avatar: article.author.image,
              date: article.createdAt,
              favorited: article.favorited,
              favoritesCount: article.favoritesCount,
            }) satisfies Article
        );
        const count = response.articlesCount;

        dispatch(articlesSlice.actions.saveArticles({ articles, count }));
      })
      .catch(console.log);
  };
