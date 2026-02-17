
export interface MediaItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  rating?: number;
  year?: string;
  genre?: string;
  progress?: number;
  timeRemaining?: string;
  isNew?: boolean;
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
