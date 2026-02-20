import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import { tmdbService, getImageUrl } from '../services/tmdb'; // Importar servicio
import MediaCard from '../components/MediaCard';
import { MediaItem, PageRoute } from '../types';
import { useNavigate } from 'react-router-dom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext, // Opcional en móvil
  // CarouselPrevious, // Opcional en móvil
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay" // Si quieres autoplay (opcional)

const Home: React.FC = () => {

  const navigate = useNavigate();

  const [heroMovies, setHeroMovies] = useState<MediaItem[]>([]);
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [popular, setPopular] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ejecutamos las peticiones en paralelo
        const [nowPlayingData, trendingData, popularData] = await Promise.all([
          tmdbService.getNowPlaying(),
          tmdbService.getTrending(),
          tmdbService.getPopular()
        ]);

        // Helper para formatear datos de TMDB a MediaItem
        const formatData = (items: any[]): MediaItem[] => items.map((item: any) => ({
          id: item.id.toString(),
          title: item.title || item.name,
          subtitle: new Date(item.release_date || item.first_air_date).getFullYear().toString() || 'Desconocido',
          image: getImageUrl(item.backdrop_path || item.poster_path), // Backdrop se ve mejor en carrusel/landscape
          poster: getImageUrl(item.poster_path), // Guardamos el poster por si acaso
          rating: Number(item.vote_average.toFixed(1)),
          isNew: Math.random() > 0.8 // Simulación de "Nuevo"
        }));

        setHeroMovies(formatData(nowPlayingData.results.slice(0, 5))); // Top 5 para el carrusel
        setTrending(formatData(trendingData.results));
        setPopular(formatData(popularData.results));
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
     return (
        <div className="flex justify-center items-center h-screen bg-background-dark">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
     );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* HEADER / MENÚ SUPERIOR */}
      <header className="px-6 pt-12 pb-2 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-lg z-30 transition-all">
        <button
          onClick = {() => navigate('/search')} 
          className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        
        {/* Enlaces de navegación superiores */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/" className="text-white border-b-2 border-primary pb-1">
            Inicio
          </Link>
          <Link to={`/${PageRoute.SERIES}`} className="text-slate-400 hover:text-slate-200 transition-colors">
            Series
          </Link>
          {/* "Mi Lista" lleva a Perfil como solicitaste */}
          <Link to={`/${PageRoute.PROFILE}`} className="text-slate-400 hover:text-slate-200 transition-colors">
            Mi lista
          </Link>
        </nav>
        
        <div className="w-6"></div> {/* Espaciador para equilibrar el icono de búsqueda */}
      </header>

      <main className="space-y-8">
        {/* CARRUSEL HERO (IMÁGENES DE API) */}
        <section className="relative px-0">
          <Carousel 
            plugins={[Autoplay({ delay: 4000 })]}
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent className="-ml-0">
              {heroMovies.map((movie) => (
                <CarouselItem key={movie.id} className="pl-0 basis-full">
                  <div className="relative w-full aspect-[4/5] sm:aspect-video">
                    {/* Imagen de fondo con gradiente */}
                    <img 
                      src={movie.image} 
                      alt={movie.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
                    
                    {/* Información sobre la imagen */}
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Destacado</span>
                           <span className="text-white/80 text-xs flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px] text-yellow-400 fill-current">star</span>
                              {movie.rating}
                           </span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1 leading-tight drop-shadow-lg">
                          {movie.title}
                        </h1>
                        <p className="text-slate-300 text-sm line-clamp-1">{movie.subtitle} • Género</p>
                        
                        <div className="flex gap-3 mt-4">
                           <button className="flex-1 bg-white text-black py-2.5 rounded-xl font-bold flex items-center justify-center gap-2">
                              <span className="material-symbols-outlined text-xl fill-current">play_arrow</span>
                              Reproducir
                           </button>
                           <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                              <span className="material-symbols-outlined text-xl">add</span>
                           </button>
                        </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Controles eliminados para estilo móvil más limpio */}
          </Carousel>
        </section>

        {/* SECCIÓN TENDENCIAS (API) */}
        <section className="px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Tendencias</h2>
            <button className="text-primary text-sm font-medium">Ver todo</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {trending.map(item => (
              <div key={item.id} className="w-36 flex-shrink-0">
                 <MediaCard item={{...item, image: item.poster || item.image}} type="poster" />
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN MÁS POPULARES (API) */}
        <section className="px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Los más populares</h2>
            <button className="text-primary text-sm font-medium">Ver todo</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
             {popular.map(item => (
                <div key={item.id} className="w-[80vw] sm:w-[400px] flex-shrink-0">
                   <MediaCard item={item} type="landscape" className="w-full" />
                </div>
             ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;