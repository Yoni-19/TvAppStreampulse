// src/services/tmdb.ts
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

// Helper para construir la URL de la imagen
export const getImageUrl = (path: string | null) => {
  return path ? `${IMAGE_BASE_URL}${path}` : 'https://placehold.co/500x750?text=No+Image';
};

// Tipos básicos para la respuesta de TMDB
interface TMDBMovie {
  id: number;
  title?: string;
  name?: string; // Series usan 'name'
  poster_path: string | null;
  vote_average: number;
  overview: string;
  media_type?: 'movie' | 'tv';
}

// Función genérica para fetch
async function fetchTMDB(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-ES`);
  if (!response.ok) throw new Error('Error fetching data from TMDB');
  return response.json();
}

export const tmdbService = {
  // Obtener detalles de una lista de IDs (para favoritos)
  getByIds: async (items: { id: string; type: 'movie' | 'tv' }[]) => {
    const promises = items.map(item => 
      fetchTMDB(`/${item.type}/${item.id}`)
        .then(data => ({ ...data, media_type: item.type })) // Aseguramos mantener el tipo
    );
    return Promise.all(promises);
  },

  getTrending: async () => {
    return fetchTMDB('/trending/all/day');
  },
  
  getPopular: async () => {
    return fetchTMDB('/movie/popular');
  },

  getNowPlaying: async () => {
    return fetchTMDB('/movie/now_playing');
  },
  
  getTopRated: async () => {
    return fetchTMDB('/movie/top_rated');
  },

  getDetails: async (type: 'movie' | 'tv', id: string) => {
    return fetchTMDB(`/${type}/${id}`);
  },

  // Obtener reparto (actores)
  getCredits: async (type: 'movie' | 'tv', id: string) => {
    return fetchTMDB(`/${type}/${id}/credits`);
  },
  
  // Obtener videos (trailers)
  getVideos: async (type: 'movie' | 'tv', id: string) => {
    return fetchTMDB(`/${type}/${id}/videos`);
  },
  
  // Búsqueda (útil para el futuro)
  search: async (query: string) => {
    return fetchTMDB(`/search/multi?query=${encodeURIComponent(query)}`);
  }
};