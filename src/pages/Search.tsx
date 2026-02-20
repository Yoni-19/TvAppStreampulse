import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tmdbService, getImageUrl } from '../services/tmdb';
import MediaCard from '../components/MediaCard';
import { MediaItem } from '../types';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si el buscador está vacío, limpiamos la pantalla
    if (query.trim().length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }

    // EL DEBOUNCE: Esperamos 500ms antes de buscar
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await tmdbService.search(query);
        
        // Transformamos los datos y filtramos solo películas y series (quitamos actores)
        const formattedData: MediaItem[] = data.results
          .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
          .map((item: any) => ({
            id: item.id.toString(),
            title: item.title || item.name,
            subtitle: item.media_type === 'movie' ? 'Película' : 'Serie',
            image: getImageUrl(item.poster_path),
            type: item.media_type,
            rating: item.vote_average ? Number(item.vote_average.toFixed(1)) : undefined
          }));

        setResults(formattedData);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // 500 milisegundos de espera

    // Limpieza: Si el usuario escribe otra letra antes de los 500ms, cancela el timer anterior
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen bg-background-dark pb-32">
      {/* HEADER DE BÚSQUEDA */}
      <header className="sticky top-0 z-20 bg-background-dark/95 backdrop-blur-md px-6 py-4 flex items-center gap-3 border-b border-white/5">
        <button 
          onClick={() => navigate(-1)} 
          className="text-slate-400 hover:text-white transition"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            autoFocus
            placeholder="Buscar películas o series..." 
            className="w-full bg-white/10 text-white placeholder:text-slate-500 rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-1 focus:ring-primary transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </header>

      {/* RESULTADOS */}
      <main className="px-5 pt-6">
        {loading ? (
          <div className="flex justify-center pt-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 gap-y-10">
            {results.map((item) => (
              <MediaCard 
                key={item.id} 
                item={item} 
                type="poster"
                className="w-full"
              />
            ))}
          </div>
        ) : query.length > 0 ? (
          <div className="text-center pt-20 opacity-50">
            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
            <p>No se encontraron resultados para "{query}"</p>
          </div>
        ) : (
          <div className="text-center pt-20 opacity-30">
            <span className="material-symbols-outlined text-6xl mb-4">movie</span>
            <p>Encuentra tu próxima película o serie favorita</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;