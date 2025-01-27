import axios from 'axios';
import { z } from 'zod';

import { Article } from '../components/articles/articles.slice.ts';

import { getToken, setToken } from './token-provider.ts';
import authRequest from './auth-request.tsx';
import { extractError } from './auth-provider.ts';

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
    const isAuthorized = !!getToken();
    const requestProvider = isAuthorized ? authRequest : axios;

    return requestProvider.get(`${baseURL}/articles?offset=${offset}`).then((response) => {
      const { articles, articlesCount } = ArticlesDto.parse(response.data);
      return {
        articles: articles.map((article) => serverArticleToArticle(article)),
        count: articlesCount,
      };
    });
  },

  getArticleById: async (articleId: string) => {
    const isAuthorized = !!getToken();
    const requestProvider = isAuthorized ? authRequest : axios;

    return requestProvider.get(`${baseURL}/articles/${articleId}`).then((response) => {
      const article = ArticleDto.parse(response.data.article);
      return {
        article: serverArticleToArticle(article),
      };
    });
  },

  register: async (email: string, password: string, username: string) => {
    return axios
      .post(`${baseURL}/users`, { user: { email, password, username } })
      .then((response) => {
        const user = UserDto.parse(response.data.user);
        setToken(user.token);
        return { user };
      })
      .catch((error) => {
        throw extractError(error.response.data.errors);
      });
  },

  login: async (email: string, password: string) => {
    return axios
      .post(`${baseURL}/users/login`, { user: { email, password } })
      .then((response) => {
        const user = UserDto.parse(response.data.user);
        setToken(user.token);
        return { user };
      })
      .catch((error) => {
        throw extractError(error.response.data.errors);
      });
  },

  getUser: async () => {
    return authRequest.get(`${baseURL}/user`).then((response) => {
      const user = response.data.user;
      return { user };
    });
  },

  updateUser: async ({
    username,
    email,
    password,
    image,
  }: {
    username?: string;
    email?: string;
    password?: string;
    image?: string;
  }) => {
    return authRequest
      .put(`${baseURL}/user`, {
        user: {
          username,
          email,
          password,
          image,
        },
      })
      .then((response) => {
        const user = UserDto.parse(response.data.user);
        setToken(user.token);
        return { user };
      })
      .catch((error) => {
        throw extractError(error.response.data.errors);
      });
  },

  createArticle: async (title: string, description: string, text: string, tagList?: string[]) => {
    return authRequest
      .post(`${baseURL}/articles`, {
        article: {
          title,
          description,
          body: text,
          tagList,
        },
      })
      .then((response) => {
        const article = ArticleDto.parse(response.data.article);
        return {
          article: serverArticleToArticle(article),
        };
      });
  },

  updateArticle: async (id: string, title: string, description: string, text: string, tagList?: string[]) => {
    return authRequest
      .put(`${baseURL}/articles/${id}`, {
        article: {
          title,
          description,
          body: text,
          tagList,
        },
      })
      .then((response) => {
        const article = ArticleDto.parse(response.data.article);
        return {
          article: serverArticleToArticle(article),
        };
      });
  },

  deleteArticle: async (id: string) => {
    return authRequest.delete(`${baseURL}/articles/${id}`);
  },

  favoriteArticle: async (id: string) => {
    return authRequest.post(`${baseURL}/articles/${id}/favorite`).then((response) => {
      const article = ArticleDto.parse(response.data.article);
      return {
        article: serverArticleToArticle(article),
      };
    });
  },

  unfavoriteArticle: async (id: string) => {
    return authRequest.delete(`${baseURL}/articles/${id}/favorite`).then((response) => {
      const article = ArticleDto.parse(response.data.article);
      return {
        article: serverArticleToArticle(article),
      };
    });
  },
};

const serverArticleToArticle = (response: ServerArticle): Article => {
  return {
    id: response.slug,
    title: response.title,
    tags: response.tagList || [],
    text: response.body ? response.body : '',
    description: response.description,
    author: response.author.username,
    image: response.author.image,
    date: response.createdAt,
    favorited: response.favorited,
    favoritesCount: response.favoritesCount,
  };
};
