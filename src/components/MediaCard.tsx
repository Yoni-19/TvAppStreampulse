
import React from 'react';
import { MediaItem } from '../types';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface MediaCardProps {
  item: MediaItem;
  type?: 'poster' | 'landscape' | 'wide-landscape';
  showProgress?: boolean;
  className?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, type = 'poster', showProgress = false, className }) => {

  const navigate = useNavigate(); // <--- Hook

  const handleClick = () => {
    // Si el item tiene tipo (movie/tv), navegamos. Si no, asumimos 'movie' por defecto.
    const mediaType = item.type || 'movie'; 
    navigate(`/details/${mediaType}/${item.id}`);
  };

  const getAspectRatio = () => {
    switch (type) {
      case 'landscape': return 'aspect-video';
      case 'wide-landscape': return 'aspect-[16/10]';
      case 'poster': default: return 'aspect-[3/4.5]';
    }
  };

  const defaultWidth = type === 'poster' ? 'w-36' : type === 'landscape' ? 'w-[calc(50%-8px)]' : 'w-full';

  return (
    <div 
    onClick={handleClick}
    className={cn(
      "flex-shrink-0 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]",
      defaultWidth,
      className // Esto permitirá sobrescribir el ancho con "w-full"
    )}>
      <div className={`relative ${getAspectRatio()} rounded-2xl overflow-hidden bg-slate-800`}>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80" 
        />
        {item.isNew && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
            New
          </div>
        )}
        {item.rating && (
           <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-1">
             <span className="material-symbols-outlined text-yellow-400 text-[12px] fill-current">star</span>
             <span className="text-[10px] font-bold">{item.rating}</span>
           </div>
        )}
        {showProgress && item.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${item.progress}%` }} 
            />
          </div>
        )}
        {type === 'wide-landscape' && (
           <div className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-white text-3xl ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className={`font-bold truncate text-white ${type === 'poster' ? 'text-sm' : 'text-base'}`}>{item.title}</h3>
        <p className="text-slate-400 text-[11px] truncate">{item.subtitle}</p>
        {item.timeRemaining && (
          <p className="text-primary text-[10px] mt-1 font-medium">{item.timeRemaining}</p>
        )}
      </div>
    </div>
  );
};

export default MediaCard;
