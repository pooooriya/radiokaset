import axios from 'axios';
import {
  GRAPHQL,
  MINI_SEARCH_ARTIST,
  MINI_SEARCH_MUSIC,
  POST_VISIT_MUSIC,
} from '@/constants/api';

export const getLastMusicInSite = (limit) => {
  const url = GRAPHQL();
  return axios.post(url, {
    query: `{
        musics(sort:"published_at:DESC",limit:${limit}){
            id
            persianTitle
            englishTitle
            view
            lyrics
            musicLength
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
            album{
              persianTitle
              englishTitle
            }
            artist{
              persianTitle
        englishTitle
      }
         }
      }`,
  });
};

export const getBestMusic = (limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort:"view:DESC",limit:${limit}){
          id
          persianTitle
          englishTitle
          view
          lyrics
          musicLength
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
          album{
            persianTitle
            englishTitle
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

export const getLastMusic = (limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      musics(sort:"releasedDate:DESC",limit:${limit}){
          id
          persianTitle
          englishTitle
          view
          lyrics
          musicLength
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
          album{
            persianTitle
            englishTitle
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

export const getTopFiveMusicByArtist = (id, limit) => {
  const url = GRAPHQL();

  return axios.post(url, {
    query: `{
      artists(where: { id: ${id} }) {
        musics(sort: "view:DESC", limit: ${limit}) {
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
          artist{
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

export const searchMusic = (query) => {
  const value = encodeURIComponent(query);
  const url = MINI_SEARCH_MUSIC(value);
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const searchArtist = (query) => {
  const value = encodeURIComponent(query);
  const url = MINI_SEARCH_ARTIST(value);
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
