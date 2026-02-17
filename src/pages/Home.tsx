
import React from 'react';
import { HERO_MOVIE, TRENDING_MEDIA } from '../constants';
import MediaCard from '../components/MediaCard';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="px-6 pt-12 pb-2 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-lg z-30">
        <button className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined">search</span>
        </button>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#" className="text-white border-b-2 border-primary pb-1">Películas</a>
          <a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Series</a>
          <a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Mi lista</a>
        </nav>
        <div className="w-6"></div>
      </header>

      <main className="px-6 space-y-8">
        <section>

          <Carousel>
            <CarouselContent>
              <CarouselItem>Contenido 1</CarouselItem>
              <CarouselItem>Contenido 2</CarouselItem>
              <CarouselItem>Contenido 3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <MediaCard item={HERO_MOVIE} type="wide-landscape" />
          <div className="mt-4 -translate-y-20 pl-6 pointer-events-none">
             <div className="flex items-center gap-3 mb-1">
                <span className="text-white font-bold text-lg tracking-tighter italic opacity-90">DISNEY+</span>
                <div className="h-3 w-px bg-white/30"></div>
                <span className="text-white font-black text-[9px] uppercase tracking-widest bg-red-600 px-1.5 py-0.5 rounded-sm">Marvel</span>
             </div>
             <h1 className="text-2xl font-bold text-white drop-shadow-md">{HERO_MOVIE.title}</h1>
             <p className="text-slate-300 text-sm opacity-80">{HERO_MOVIE.subtitle}</p>
          </div>
        </section>

        <section className="-mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Tendencias</h2>
            <button className="text-primary text-sm font-medium">Ver todo</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
            {TRENDING_MEDIA.map(item => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Los más populares</h2>
            <button className="text-primary text-sm font-medium">Ver todo</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
            <div className="min-w-65 aspect-video rounded-2xl overflow-hidden bg-slate-800">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRTgqGrOGnI4P3c4rBaAE2vgNSJsF7TlTEpHBf-n4BR7EJndD4LLKqtN0fEXViShbN2eCs_1ilWaRzSeh9DW7ff3SkP4EsX0NEyTdFX_xyz0Gm6RusVhf83Tpw_UCFGeehByDvMb4pm1XMx8EADJ4tJmOFsDrmEJK2kPhRbJEOD5YgrH63VGavZzjUlie94BrdmT6HimGzU9bFzK0qTEaXA1A1ktuDpv29-INGB9sUjwEQzlFh-ykVVljC9uyOlFdk5vjrcwM4iNI" alt="Popular" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-65 aspect-video rounded-2xl overflow-hidden bg-slate-800">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC50v77y-R6Z5yOc_NDnUAz-3ulTRT1Lu-WfEKGt1SlqPyh8pf2haLno_fjs_7azMGwsvGIXbHbozFwsIl96PC2QwbpE7pY6rcMk-vSQnLjdyJxUzKnVCQ-fnaUwf1coruB-5Cd3ORRUXC3Sl7Gw8-t6JUtXvHHoEZ0gqr4VokCtZzea5CsE_GvcK2c76BQjx-aoHQO4kKi_QS1NYfMpkzQEYIFO3LyOnyBixDOYX9fZ61kD5HojHzlayPrupbwNxtu8e0UprUW2I" alt="Popular" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
