import { API_URL } from '../../env';

// graphql
export const GRAPHQL = () => `${API_URL}/graphql`;

// music

export const POST_VISIT_MUSIC = (id) => `${API_URL}/musics/${id}`;
