import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getPlaylists = (limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `
      {
        playlists(sort:"published_at:DESC"
        ${limit && `limit:${limit}`}
         ){
            id
             persianTitle
             englishTitle
             cover{
               url
             }
           }
     }
        `,
  });
};

export const getMorePlaylist = (start, limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `
        {
          playlists(sort:"published_at:DESC"
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
       }
          `,
  });
};
