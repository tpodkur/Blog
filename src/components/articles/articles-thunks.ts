import { AppThunk, createAppAsyncThunk } from '../../redux.ts';

import { articlesSlice, ArticleId } from './articles.slice.ts';

export const requestArticles = createAppAsyncThunk(
  'article/requestArticles',
  async (_, thunkAPI) => {
    const page = articlesSlice.selectors.page(thunkAPI.getState());
    const offset = (page - 1) * 20;
    try {
      return await thunkAPI.extra.api.getArticles(offset);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
  {
    condition: (params, { getState }) => {
      const isIdle = articlesSlice.selectors.isRequestArticlesIdle(getState());
      return isIdle || !!params?.refetch;
    },
  }
);

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
