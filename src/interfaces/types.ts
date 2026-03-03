
export interface MediaItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  poster?: string; 
  rating?: number;
  year?: string;
  genre?: string;
  progress?: number;
  timeRemaining?: string;
  isNew?: boolean;
  type?: 'movie'|'tv';
}

export interface UserStats {
  movies: number;
  series: number;
  minutes: string;
}

export enum PageRoute {
  HOME = 'home',
  SERIES = 'series',
  PROFILE = 'profile'
}

export interface FavoriteItem {
  id: string;
  type: 'movie' | 'tv';
}

export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string; // Series usan 'name'
  poster_path: string | null;
  vote_average: number;
  overview: string;
  media_type?: 'movie' | 'tv';
}
