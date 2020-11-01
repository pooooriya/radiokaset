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
