import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private api = environment.apiUrl + '/movies';

  constructor(private http: HttpClient) { }
  getMovies(skip: number = 0, limit: number = 10): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api}?skip=${skip}&limit=${limit}`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.api}/${id}`);
  }

  searchMovies(keyword: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api}/search?keyword=${keyword}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.api, movie);
  }

  updateMovie(id: number, movie: Partial<Movie>): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
