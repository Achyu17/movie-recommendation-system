export interface Movie {
  id: number;
  title: string;
  genre: string;
  language: string;
  director: string;
  cast: string;
  description: string;
  release_year: number;
  poster_url: string;   
  average_rating?: number; 
}