import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { publicationsSlice } from './publications.slice.ts';

const reducer = combineSlices(publicationsSlice);

const store = configureStore({
  reducer,
});

export default store;
