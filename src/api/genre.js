import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getGenres = (limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        genres(limit:${limit}){
          persianTittle
          englishTitle
          cover{
            url
          }
          }
      }`,
  });
};

export const getMoreGenres = (start, limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        genres(
          ${start && `start:${start}`}
          ${limit && `limit:${limit}`}
        ){
          persianTittle
          englishTitle
          cover{
            url
          }
          }
      }`,
  });
};
