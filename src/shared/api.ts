import axios from 'axios';

const baseURL = 'https://blog-platform.kata.academy/api';

export const api = {
  getPublications: async () => {
    return await axios
      .get(`${baseURL}/articles`)
      .then((response) => {
        console.log(response);
      })
      .catch(console.log);
  },
};
