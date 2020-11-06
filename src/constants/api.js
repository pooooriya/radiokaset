import { API_URL } from '../../env';

// graphql
export const GRAPHQL = () => `${API_URL}/graphql`;

// music

export const POST_VISIT_MUSIC = (id) => `${API_URL}/musics/${id}`;

// search
export const MINI_SEARCH_MUSIC = (query) =>
  `${API_URL}/musics?_q=${query}&_limit=15`;
export const MINI_SEARCH_ARTIST = (query) =>
  `${API_URL}/artists?_q=${query}&_limit=15`;
