import { AppThunk } from '../redux/store.ts';
import { articlesSlice, Article } from '../redux/articles.slice.ts';

export const requestArticles =
  (): AppThunk =>
  (dispatch, _, { api }) => {
    api.getArticles().then((response) => {
      const articles = response
        ? response?.articles.map(
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
          )
        : [];

      dispatch(articlesSlice.actions.saveArticles({ articles }));
    });
  };
