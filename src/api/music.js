import axios from 'axios';
import { GRAPHQL, POST_VISIT_MUSIC } from '@/constants/api';

export const getLastMusicInSite = () => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        musics(sort:"published_at:DESC",limit:15){
            id
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
          id
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
          id
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

export const getTopFiveMusicByArtist = (id) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      artists(where: { id: ${id} }) {
        musics(sort: "view:DESC", limit: 10) {
          id
          persianTitle
          englishTitle
          view
          cover{
            url
          }
          musicLength
          musicFile {
            url
          }
          lyrics
          album {
            persianTitle
            englishTitle
          }
        }
      }
    }
    `,
  });
};

export const getAllMusic = (id) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      artists(where: { id: ${id} }) {
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
    
    `,
  });
};

export const getPodcastMusics = (limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort:"releasedDate:DESC" limit:${limit} where:{musicTyoe:"podcast"}){
          id
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

export const getMorePodcast = (start, limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort:"releasedDate:DESC"  
      ${start && `start:${start}`}
      ${limit && `limit:${limit}`}
       where:{musicTyoe:"podcast"}){
          id
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

export const getAllMusicByParams = () => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort:"releasedDate:DESC" limit:${limit} where:{musicTyoe:"podcast"}){
          id
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

export const getLastestPodcast = (limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort:"published_at:DESC" limit:${limit} where:{musicTyoe:"podcast"}){
          id
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

export const getTopBestPodcast = (limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort: "view:DESC" limit:${limit} where:{musicTyoe:"podcast"}){
          id
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

export const visitMusic = (id) => {
  const url = POST_VISIT_MUSIC(id);
  return axios.put(url);
};
