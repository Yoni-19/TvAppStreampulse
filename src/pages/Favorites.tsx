// src/pages/Favorites.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tmdbService, getImageUrl } from '../services/tmdb';
import { useFavorites } from '../hooks/useFavorites';
import MediaCard from '../components/MediaCard';
import { MediaItem } from '../types';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      if (favorites.length === 0) {
        setMediaItems([]);
        setLoading(false);
        return;
      }

      try {
        const data = await tmdbService.getByIds(favorites);
        
        // Transformamos la respuesta de TMDB a tu tipo MediaItem
        const formattedData: MediaItem[] = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title || item.name, // Películas usan title, Series usan name
          subtitle: item.media_type === 'movie' ? 'Película' : 'Serie',
          image: getImageUrl(item.poster_path),
          rating: Number(item.vote_average.toFixed(1)),
          // Puedes añadir más campos si tu MediaCard los soporta
          type: item.media_type || (item.title ? 'movie' : 'tv'),
        }));

        setMediaItems(formattedData);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesData();
  }, [favorites]);

  return (
    <div className="min-h-screen bg-background-dark pb-32">
      {/* Header flotante */}
      <header className="sticky top-0 z-10 bg-background-dark/95 backdrop-blur-sm px-6 py-4 flex items-center gap-4 border-b border-white/5">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition"
        >
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold text-white">Mi Lista</h1>
        <div className="ml-auto text-sm text-slate-400">
          {favorites.length} Títulos
        </div>
      </header>

      <main className="px-6 pt-6">
        {loading ? (
          <div className="flex justify-center pt-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : mediaItems.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 gap-y-10">
            {mediaItems.map((item) => (
              <MediaCard 
                key={item.id} 
                item={item} 
                type="poster"
                className="w-full" // Usamos formato póster para ver más elementos
              />
            ))}
          </div>
        ) : (
          <div className="text-center pt-20 opacity-50">
            <span className="material-symbols-outlined text-6xl mb-4">bookmark_border</span>
            <p>Aún no tienes favoritos.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;