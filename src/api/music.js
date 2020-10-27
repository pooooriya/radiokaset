import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getLastMusicInSite = () => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        musics(sort:"published_at:DESC",limit:15){
            persianTitle
            englishTitle
            view
            lyrics
            artist{
              persianTitle
              englishTitle
            }
                cover{
              url
            }
            musicFile{
              url
            }
         }
      }`,
  });
};

export const getBestMusic = () => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort:"view:DESC",limit:15){
          persianTitle
          englishTitle
          view
          lyrics
          artist{
            persianTitle
            englishTitle
          }
              cover{
            url
          }
          musicFile{
            url
          }
       }
    }
    `,
  });
};

export const getLastMusic = () => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort:"releasedDate:DESC",limit:15){
          persianTitle
          englishTitle
          view
          lyrics
          artist{
            persianTitle
            englishTitle
          }
              cover{
            url
          }
          musicFile{
            url
          }
       }
    }
    `,
  });
};
