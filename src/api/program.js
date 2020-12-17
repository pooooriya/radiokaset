import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getPodcastProgram = (limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        programs(sort:"published_at:DESC",
        ${limit && `limit:${limit}`}
        ,where:{type:"podcast"}){
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

export const getMorePodcastProgram = (start, limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
          programs(sort:"published_at:DESC",
          ${limit && `limit:${limit}`}
          ${start && `start:${start}`}
          ,where:{type:"podcast"}){
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

export const getPlaylistProgram = (limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
          programs(sort:"published_at:DESC",
          ${limit && `limit:${limit}`}
          ,where:{type:"playlist"}){
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

export const getAPlaylistProgram = (id) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
          programs(sort:"published_at:DESC",
          ,where:{id:${id},type:"playlist"}){
            id
            persianTitle
            englishTitle
            cover{
              url
            }
            music(sort:"published_at:DESC"){
              id
              persianTitle
              englishTitle
           musicFile{
            url
          }
              musicLength
              cover{
                url
              }
           
            }
          }
        }`,
  });
};

export const getMorePlaylistProgram = (start, limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
            programs(sort:"published_at:DESC",
            ${limit && `limit:${limit}`}
            ${start && `start:${start}`}
            ,where:{type:"playlist"}){
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
