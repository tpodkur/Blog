import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ArticleId = string;

export type Article = {
  id: string;
  title: string;
  tags: string[];
  text: string;
  author: string;
  avatar: string;
  date: string;
  favorited: boolean;
  favoritesCount: number;
};

type ArticlesState = {
  entities: Record<ArticleId, Article>;
  ids: ArticleId[];
  loading: boolean;
  page: number;
};

const initialArticlesState: ArticlesState = {
  entities: {},
  ids: [],
  loading: true,
  page: 1,
};

export const articlesSlice = createSlice({
  name: 'article',
  initialState: initialArticlesState,
  selectors: {
    loading: (state: ArticlesState) => state.loading,
    articles: createSelector(
      (state: ArticlesState) => state.entities,
      (state: ArticlesState) => state.ids,
      (entities, ids) => {
        return ids.map((id) => entities[id]);
      }
    ),
    page: (state: ArticlesState) => state.page,
  },
  reducers: {
    saveArticles: (state, action: PayloadAction<{ articles: Article[] }>) => {
      const { articles } = action.payload;
      return {
        ...state,
        entities: {
          ...articles.reduce((acc: Record<ArticleId, Article>, article: Article) => {
            return {
              ...acc,
              [article.id]: article,
            };
          }, {}),
        },
        ids: [...articles.map((a) => a.id)],
        loading: false,
      };
    },
    changePage: (state, action: PayloadAction<{ page: number }>) => {
      const { page } = action.payload;
      return {
        ...state,
        page,
      };
    },
  },
});
