import { AppThunk } from '../redux/store.ts';
import { articlesSlice, ArticleId } from '../redux/articles.slice.ts';

export const requestArticles =
  (page: number = 1): AppThunk =>
  (dispatch, _, { api }) => {
    const offset = (page - 1) * 20;
    dispatch(articlesSlice.actions.requestArticlesPending());
    api
      .getArticles(offset)
      .then((response) => {
        dispatch(articlesSlice.actions.saveArticles(response));
      })
      .catch((error) => {
        console.error(error);
        dispatch(articlesSlice.actions.requestArticlesFailed());
      });
  };

export const requestArticle =
  (articleId: ArticleId): AppThunk =>
  (dispatch, _, { api }) => {
    dispatch(articlesSlice.actions.requestArticlePending());
    api
      .getArticleById(articleId)
      .then((response) => {
        dispatch(articlesSlice.actions.saveArticle(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(articlesSlice.actions.requestArticleFailed());
      });
  };
