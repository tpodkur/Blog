import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type PublicationId = string;

type Publication = {
  id: string;
  title: string;
  tags: string[];
  text: string;
  author: string;
  avatar: string;
  date: string;
};

type PublicationsState = {
  entities: Record<PublicationId, Publication>;
  ids: PublicationId[];
  loading: boolean;
};

const initialPublicationsState: PublicationsState = {
  entities: {},
  ids: [],
  loading: true,
};

export const publicationsSlice = createSlice({
  name: 'publication',
  initialState: initialPublicationsState,
  // selectors:
  reducers: {
    savePublications: (state, action: PayloadAction<{ publications: Publication[] }>) => {
      const { publications } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          ...publications.reduce((acc: Record<PublicationId, Publication>, pub: Publication) => {
            return {
              ...acc,
              [pub.id]: pub,
            };
          }, {}),
        },
        ids: [...state.ids, ...publications.map((pub) => pub.id)],
      };
    },
  },
});
