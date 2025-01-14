import { Article, ArticleId, articlesSlice } from '../redux/articles.slice.ts';
import { AppThunk } from '../redux/store.ts';

export const requestArticle =
  (articleId: ArticleId): AppThunk =>
  (dispatch, _, { api }) => {
    dispatch(articlesSlice.actions.requestArticlePending());
    api
      .getArticleById(articleId)
      .then((response) => {
        const article = {
          id: response.slug,
          title: response.title,
          tags: response.tagList || [],
          text: response.body ? response.body : '',
          author: response.author.username,
          avatar: response.author.image,
          date: response.createdAt,
          favorited: response.favorited,
          favoritesCount: response.favoritesCount,
        } satisfies Article;
        dispatch(articlesSlice.actions.saveArticle({ article }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(articlesSlice.actions.requestArticleFailed());
      });
  };
