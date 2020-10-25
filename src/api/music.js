import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getLastMusic = () => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        musics(sort:"published_at:DESC",limit:10){
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
