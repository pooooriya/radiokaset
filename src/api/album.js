import axios from 'axios';
import { GRAPHQL } from '@/constants/api';

export const getAlbumsByArtist = (id) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
    
        artists(where:{id:${id}}){
          albums(sort:"releasedAt:DESC"){
            id
            persianTitle
            englishTitle
            releasedAt
            description
            genre{
              persianTittle
              englishTitle
            }
            albumDuration 
            
            cover{
              url
            }
            musics {
                id
                persianTitle
                englishTitle
                lyrics
                view
                musicLength
                album{
                  englishTitle
                  persianTitle
                }
                cover {
                  url
                }
                musicFile {
                  url
                }
              }
          }
        }
      }
      `,
  });
};

export const getAlbums = (limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `
    {
      albums(sort:"published_at:DESC"
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

export const getAlbumById = (id) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `
    {
      albums(where:{id:${id}}
       ){
          id
           persianTitle
           englishTitle
           releasedAt
           albumDuration
           description
           genre{
            persianTittle
            englishTitle
           }
           cover{
             url
           }
      musics{
        persianTitle
        englishTitle
        musicLength
        lyrics
        view
        cover{
          url
        }
        artist{
          persianTitle
        englishTitle
  }
        
      }
      artist{
        persianTitle
        englishTitle
      }
         }
     }
      `,
  });
};

export const getMoreAlbum = (start, limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
      albums(sort:"published_at:DESC"
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
