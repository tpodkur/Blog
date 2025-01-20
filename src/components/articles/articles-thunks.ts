import { AppThunk } from '../../redux.ts';

import { articlesSlice, ArticleId } from './articles.slice.ts';

export const requestArticles =
  ({ refetch }: { refetch?: boolean } = { refetch: false }): AppThunk =>
  (dispatch, getState, { api }) => {
    const isIdle = articlesSlice.selectors.isRequestArticlesIdle(getState());
    if (!isIdle && !refetch) {
      return;
    }

    const page = articlesSlice.selectors.page(getState());
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
