import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { articlesSlice } from '../components/articles/articles.slice.ts';
import { userSlice } from '../components/user-info/user.slice.ts';

import { extraArgument } from './extra-argument.ts';

const reducer = combineSlices(articlesSlice, userSlice);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument },
    }),
});

export default store;
