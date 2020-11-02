import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getLastArtistAdded = (limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        artists(sort:"published_at:DESC"
        ${limit && `limit:${limit}`}){
           id
            persianTitle
            englishTitle
            cover{
              url
            }
          }
      }`,
  });
};

export const getArtist = (id) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
      artist(id:${id}){
      id
      persianTitle
      englishTitle
      socialAddress
      shortDescription
      background{
      url
      }
      cover{
       url
     }
}
    }`,
  });
};

export const getMore = (start, limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        artists(sort:"published_at:DESC"
        ${start && `start:${start}`}
        ${limit && `limit:${limit}`}
        ){
           id
            persianTitle
            englishTitle
            cover{
              url
            }
          }
      }`,
  });
};
