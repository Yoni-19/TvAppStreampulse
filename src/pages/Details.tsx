import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService, getImageUrl } from '../services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import MediaCard from '../components/MediaCard';

const Details: React.FC = () => {
  const { type, id } = useParams<{ type: 'movie' | 'tv', id: string }>();
  const navigate = useNavigate();

  const { toggleFavorite, isFavorite } = useFavorites();
  const isSaved = id ? isFavorite(id) : false;
  
  const [details, setDetails] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!type || !id) return;
      setLoading(true);
      try {
        const [detailsData, creditsData] = await Promise.all([
          tmdbService.getDetails(type, id),
          tmdbService.getCredits(type, id)
        ]);
        setDetails(detailsData);
        setCast(creditsData.cast.slice(0, 10)); // Top 10 actores
      } catch (error) {
        console.error("Error cargando detalles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0); // Scroll al top al entrar
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!details) return null;

  const title = details.title || details.name;
  const year = new Date(details.release_date || details.first_air_date).getFullYear();
  const runtime = type === 'movie' 
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : `${details.number_of_seasons} Temporadas`;

  const handleToggleList = () => {
    // Nos aseguramos de tener la ID y el tipo
    if (id && type) {
      // Usamos el "interruptor" pasándole el objeto exacto que pide
      toggleFavorite({
        id: id,
        type: type as 'movie' | 'tv'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white pb-32 relative overflow-hidden">
      {/* 1. HERO BACKGROUND */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/60 to-background-dark z-10"></div>
        <img 
          src={getImageUrl(details.backdrop_path)} 
          alt={title} 
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Botón de Atrás */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Superpuesto) */}
      <div className="px-6 -mt-32 relative z-20">
        <div className="flex gap-4 items-end mb-6">
            {/* Póster pequeño flotante */}
            <img 
              src={getImageUrl(details.poster_path)} 
              alt={title} 
              className="w-28 rounded-lg shadow-2xl border border-white/10 hidden sm:block"
            />
            <div className="flex-1">
                {/* Géneros (Pill tags) */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {details.genres?.map((g: any) => (
                    <span key={g.id} className="text-[10px] uppercase font-bold bg-white/10 px-2 py-1 rounded backdrop-blur-md text-slate-200">
                      {g.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl font-bold leading-tight mb-2">{title}</h1>
                
                <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                  <span className="text-green-400 font-bold">{Math.round(details.vote_average * 10)}% Match</span>
                  <span>{year}</span>
                  <span>{runtime}</span>
                </div>
            </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-3 mb-8">

           {/* <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-lg shadow-primary/25">
              <span className="material-symbols-outlined fill-current">play_arrow</span>
              Reproducir
           </button> */}


           <button 
             onClick={handleToggleList}
             className={`flex-1 backdrop-blur-md text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
               isSaved 
                 ? 'bg-white/30 border border-white/50' // Estilo si YA está en favoritos
                 : 'bg-white/10 hover:bg-white/20'      // Estilo normal
             }`}
           >
              <span className="material-symbols-outlined">
                {isSaved ? 'check' : 'add'}
              </span>
              {isSaved ? 'En Mi Lista' : 'Mi Lista'}
           </button>

           
        </div>

        {/* Sinopsis */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-2 text-white">Sinopsis</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{details.overview}</p>
        </div>

        {/* Reparto (Carrusel) */}
        <div className="mb-8">
           <h3 className="font-bold text-lg mb-4 text-white">Reparto Principal</h3>
           <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4">
              {cast.map(actor => (
                <div key={actor.id} className="w-24 flex-shrink-0 text-center">
                   <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-2 border-2 border-white/10">
                      <img 
                        src={getImageUrl(actor.profile_path)} 
                        alt={actor.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100?text=?'}
                      />
                   </div>
                   <p className="text-xs font-medium text-white truncate">{actor.name}</p>
                   <p className="text-[10px] text-slate-500 truncate">{actor.character}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Details;