import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getEpisodeByProgram = (id) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        programs(where:{id:${id}}){
          id
          description
          persianTitle
          englishTitle
          cover{
              url
            }
          socialAddress
          music(sort:"published_at:DESC"){
            id
            persianTitle
            englishTitle
            lyrics
            cover{
              url
            }
            musicFile{
              url
            }
          }
        }
      }`,
  });
};
