import axios from 'axios';
import { z } from 'zod';

import { Article } from '../components/articles/articles.slice.ts';
import { User } from '../components/user-info/user.slice.ts';

import { setToken } from './token-provider.ts';
import authRequest from './auth-request.tsx';

const baseURL = 'https://blog-platform.kata.academy/api';

const ArticleDto = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  tagList: z.array(z.string()).or(z.null()),
  body: z.string().or(z.undefined()),
  author: z.object({
    username: z.string(),
    image: z.string(),
    following: z.boolean(),
  }),
  createdAt: z.string(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
});

const ArticlesDto = z.object({
  articles: z.array(ArticleDto),
  articlesCount: z.number(),
});

const UserDto = z.object({
  email: z.string(),
  token: z.string(),
  username: z.string(),
  bio: z.string().optional(),
  image: z.string().optional(),
});

type ServerArticle = z.infer<typeof ArticleDto>;

export const api = {
  getArticles: async (offset: number = 0) => {
    return await axios.get(`${baseURL}/articles?offset=${offset}`).then((response) => {
      const { articles, articlesCount } = ArticlesDto.parse(response.data);
      return {
        articles: articles.map((article) => serverArticleToArticle(article)),
        count: articlesCount,
      };
    });
  },

  getArticleById: async (articleId: string) => {
    return await axios.get(`${baseURL}/articles/${articleId}`).then((response) => {
      const article = ArticleDto.parse(response.data.article);
      return {
        article: serverArticleToArticle(article),
      };
    });
  },

  register: async (email: string, password: string, username: string) => {
    return await axios.post(`${baseURL}/users`, { user: { email, password, username } }).then((response) => {
      const user = UserDto.parse(response.data.user);
      setToken(user.token);
      return { user };
    });
  },

  login: async (email: string, password: string) => {
    return await axios.post(`${baseURL}/users/login`, { user: { email, password } }).then((response) => {
      const user = UserDto.parse(response.data.user);
      setToken(user.token);
      return { user };
    });
  },

  getUser: async () => {
    return authRequest.get(`${baseURL}/user`).then((response) => {
      const user = response.data.user;
      return { user };
    });
  },

  updateUser: async (user: User) => {
    return authRequest
      .put(`${baseURL}/user`, {
        user: {
          email: user.email,
          username: user.username,
          image: user.avatar,
        },
      })
      .then((response) => {
        const user = UserDto.parse(response.data.user);
        return { user };
      });
  },
};

const serverArticleToArticle = (response: ServerArticle): Article => {
  return {
    id: response.slug,
    title: response.title,
    tags: response.tagList || [],
    text: response.body ? response.body : '',
    author: response.author.username,
    avatar: response.author.image,
    date: response.createdAt,
    favorited: response.favorited,
    favoritesCount: response.favoritesCount,
  };
};
