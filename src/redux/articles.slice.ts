import { createSlice } from '@reduxjs/toolkit';
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
};

type ArticlesState = {
  entities: Record<ArticleId, Article>;
  ids: ArticleId[];
  loading: boolean;
};

const initialArticlesState: ArticlesState = {
  entities: {},
  ids: [],
  loading: true,
};

export const articlesSlice = createSlice({
  name: 'article',
  initialState: initialArticlesState,
  selectors: {
    loading: (state: ArticlesState) => state.loading,
  },
  reducers: {
    saveArticles: (state, action: PayloadAction<{ articles: Article[] }>) => {
      const { articles } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          ...articles.reduce((acc: Record<ArticleId, Article>, article: Article) => {
            return {
              ...acc,
              [article.id]: article,
            };
          }, {}),
        },
        ids: [...state.ids, ...articles.map((a) => a.id)],
        loading: false,
      };
    },
  },
});
