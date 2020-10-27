import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getLastArtistAdded = () => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        artists(sort:"published_at:DESC",limit:10){
            persianTitle
            englishTitle
            cover{
              url
            }
          }
      }`,
  });
};
