import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createArticle, requestArticles } from './articles-thunks.ts';

export type ArticleId = string;

export type Article = {
  id: string;
  title: string;
  tags: string[];
  text: string;
  description: string;
  author: string;
  image: string;
  date: string;
  favorited: boolean;
  favoritesCount: number;
};

type ArticlesState = {
  entities: Record<ArticleId, Article>;
  ids: ArticleId[];
  page: number;
  count: number;
  requestArticlesStatus: 'idle' | 'pending' | 'success' | 'failed';
  requestArticleStatus: 'idle' | 'pending' | 'success' | 'failed';
  createArticleStatus: 'idle' | 'pending' | 'success' | 'failed';
};

const initialArticlesState: ArticlesState = {
  entities: {},
  ids: [],
  page: 1,
  count: 0,
  requestArticlesStatus: 'idle',
  requestArticleStatus: 'idle',
  createArticleStatus: 'idle',
};

export const articlesSlice = createSlice({
  name: 'article',
  initialState: initialArticlesState,
  selectors: {
    articles: createSelector(
      (state: ArticlesState) => state.entities,
      (state: ArticlesState) => state.ids,
      (entities, ids) => {
        return ids.map((id) => entities[id]);
      }
    ),
    page: (state) => state.page,
    count: (state) => state.count,
    articleById: (state, articleId: string) => state.entities[articleId],
    isRequestArticlesIdle: (state) => state.requestArticlesStatus === 'idle',
    isRequestArticlesPending: (state) => state.requestArticlesStatus === 'pending',
    isRequestArticlesFailed: (state) => state.requestArticlesStatus === 'failed',
    isRequestArticlesSuccess: (state) => state.requestArticlesStatus === 'success',
    isRequestArticlePending: (state) => state.requestArticleStatus === 'pending',
    isRequestArticleFailed: (state) => state.requestArticleStatus === 'failed',
    isRequestArticleSuccess: (state) => state.requestArticleStatus === 'success',
  },
  reducers: {
    changePage: (state, action: PayloadAction<{ page: number }>) => {
      const { page } = action.payload;
      return {
        ...state,
        page,
      };
    },
    saveArticle: (state, action: PayloadAction<{ article: Article }>) => {
      const { article } = action.payload;
      return {
        ...state,
        requestArticleStatus: 'success',
        entities: {
          ...state.entities,
          [article.id]: article,
        },
      };
    },
    requestArticlePending: (state) => {
      return {
        ...state,
        requestArticleStatus: 'pending',
      };
    },
    requestArticleFailed: (state) => {
      return {
        ...state,
        requestArticleStatus: 'failed',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestArticles.pending, (state) => {
      state.requestArticlesStatus = 'pending';
    });
    builder.addCase(
      requestArticles.fulfilled,
      (state, action: PayloadAction<{ articles: Article[]; count: number }>) => {
        const { articles, count } = action.payload;
        state.requestArticlesStatus = 'success';
        state.entities = {
          ...articles.reduce((acc: Record<ArticleId, Article>, article: Article) => {
            return {
              ...acc,
              [article.id]: article,
            };
          }, {}),
        };
        state.ids = [...articles.map((a) => a.id)];
        state.count = count;
      }
    );
    builder.addCase(requestArticles.rejected, (state) => {
      state.requestArticlesStatus = 'failed';
    });
    builder.addCase(createArticle.pending, (state) => {
      state.createArticleStatus = 'pending';
    });
    builder.addCase(createArticle.fulfilled, (state) => {
      state.createArticleStatus = 'success';
    });
    builder.addCase(createArticle.rejected, (state) => {
      state.createArticleStatus = 'failed';
    });
  },
});
