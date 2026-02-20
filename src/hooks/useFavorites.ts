// src/hooks/useFavorites.ts
import { useState, useEffect } from 'react';

// Estructura mínima para guardar: ID y Tipo
export interface FavoriteItem {
  id: string;
  type: 'movie' | 'tv';
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    // Carga inicial desde localStorage
    const saved = localStorage.getItem('streamPulse_favorites');
    // Si no hay nada, devolvemos algunos IDs reales de TMDB para probar (Interstellar, Joker, Breaking Bad)
    return saved ? JSON.parse(saved) : [
      { id: '157336', type: 'movie' }, // Interstellar
      { id: '475557', type: 'movie' }, // Joker
      { id: '1396', type: 'tv' },      // Breaking Bad
      { id: '299534', type: 'movie' }, // Avengers: Endgame
      { id: '60059', type: 'tv' },     // Better Call Saul
      { id: '49046', type: 'movie' },  // All Quiet on the Western Front
      { id: '119051', type: 'tv' },    // Wednesday
      { id: '634649', type: 'movie' }, // Spider-Man: No Way Home
      { id: '82856', type: 'tv' },     // The Mandalorian
      { id: '414906', type: 'movie' }  // The Batman
    ];
  });

  useEffect(() => {
    localStorage.setItem('streamPulse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === item.id); //devuelve un booleano
      if (exists) {
        return prev.filter(f => f.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorite = (id: string) => favorites.some(f => f.id === id);

  return { favorites, toggleFavorite, isFavorite };
};