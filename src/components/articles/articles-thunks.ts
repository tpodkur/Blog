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

export const createArticle = createAppAsyncThunk(
  'article/createArticle',
  async (
    {
      title,
      description,
      text,
      tags,
    }: {
      title: string;
      description: string;
      text: string;
      tags?: string[];
    },
    thunkAPI
  ) => {
    try {
      return await thunkAPI.extra.api.createArticle(title, description, text, tags);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateArticle = createAppAsyncThunk(
  'article/updateArticle',
  async (
    {
      id,
      title,
      description,
      text,
      tagList,
    }: { id: string; title: string; description: string; text: string; tagList?: string[] },
    thunkAPI
  ) => {
    try {
      return await thunkAPI.extra.api.updateArticle(id, title, description, text, tagList);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteArticle = createAppAsyncThunk('article/deleteArticle', async ({ id }: { id: string }, thunkAPI) => {
  try {
    await thunkAPI.extra.api.deleteArticle(id);
    await thunkAPI.extra.router.navigate('/articles');
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error);
  }
});
