import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getGenres = () => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        genres(limit:6){
          persianTittle
          englishTitle
          cover{
            url
          }
          }
      }`,
  });
};
