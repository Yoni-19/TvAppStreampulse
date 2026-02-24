import React, { useEffect, useState } from 'react';
import { tmdbService, getImageUrl } from '../services/tmdb';
import MediaCard from '../components/MediaCard';
import { MediaItem } from '../types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useNavigate } from 'react-router-dom';

const Series: React.FC = () => {
  const navigate = useNavigate();
  const [heroSeries, setHeroSeries] = useState<MediaItem[]>([]);
  const [popular, setPopular] = useState<MediaItem[]>([]);
  const [topRated, setTopRated] = useState<MediaItem[]>([]);
  const [onAir, setOnAir] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const [onAirData, popularData, topRatedData] = await Promise.all([
          tmdbService.getOnTheAirSeries(),
          tmdbService.getPopularSeries(),
          tmdbService.getTopRatedSeries()
        ]);

        // Helper para formatear (forzando type: 'tv')
        const formatSeries = (items: any[]): MediaItem[] => items.map((item: any) => ({
          id: item.id.toString(),
          title: item.name, // Series usan 'name'
          subtitle: new Date(item.first_air_date).getFullYear().toString() || 'Desconocido',
          image: getImageUrl(item.backdrop_path || item.poster_path),
          poster: getImageUrl(item.poster_path),
          rating: Number(item.vote_average.toFixed(1)),
          type: 'tv', // <--- IMPORTANTE: Forzamos 'tv' para que el clic lleve a detalles de serie
          isNew: Math.random() > 0.8
        }));

        setHeroSeries(formatSeries(onAirData.results.slice(0, 5))); // Top 5 para el carrusel
        setOnAir(formatSeries(onAirData.results));
        setPopular(formatSeries(popularData.results));
        setTopRated(formatSeries(topRatedData.results));
      } catch (error) {
        console.error("Error cargando series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background-dark">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 bg-background-dark min-h-screen">
      
      {/* HEADER SIMPLE (Igual que Home pero título Series) */}
      <header className="px-6 pt-8 pb-2 sticky top-0 bg-background-dark/90 backdrop-blur-lg z-30">
        <h1 className="text-2xl font-bold text-white">Series de TV</h1>
        <p className="text-slate-400 text-sm">Explora las mejores historias por episodios</p>
      </header>

      <main className="space-y-8">
        {/* 1. CARRUSEL DESTACADO (Series al aire) */}
        <section className="relative px-0">
          <Carousel 
            plugins={[Autoplay({ delay: 5000 })]}
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent className="-ml-0">
              {heroSeries.map((serie) => (
                <CarouselItem key={serie.id} className="pl-0 basis-full">
                  <div 
                    className="relative w-full aspect-[4/5] sm:aspect-video cursor-pointer"
                    onClick={() => navigate(`/details/tv/${serie.id}`)} // Clic para ver detalles
                  >
                    <img 
                      src={serie.image} 
                      alt={serie.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Nueva Temporada</span>
                           <span className="text-white/80 text-xs flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px] text-yellow-400 fill-current">star</span>
                              {serie.rating}
                           </span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1 leading-tight drop-shadow-lg">
                          {serie.title}
                        </h1>
                        <p className="text-slate-300 text-sm">{serie.subtitle} • TV Series</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* 2. SERIES POPULARES (Lista Horizontal) */}
        <section className="px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Series Populares</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
             {popular.map(item => (
                <div key={item.id} className="w-[80vw] sm:w-[300px] flex-shrink-0">
                   {/* Usamos formato landscape para variar un poco de la Home */}
                   <MediaCard item={item} type="landscape" className="w-full" />
                </div>
             ))}
          </div>
        </section>

        {/* 3. MEJOR VALORADAS (Lista Vertical / Grid) */}
        <section className="px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Aclamadas por la crítica</h2>
          </div>
          {/* Aquí usamos un GRID de 3 columnas para mostrar muchas opciones */}
          <div className="grid grid-cols-3 gap-3 gap-y-6">
            {topRated.map(item => (
              <MediaCard 
                key={item.id} 
                item={{...item, image: item.poster || item.image}} // Aseguramos usar poster vertical
                type="poster" 
                className="w-full"
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Series;