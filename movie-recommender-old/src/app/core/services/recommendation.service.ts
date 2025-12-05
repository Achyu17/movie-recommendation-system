import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private api = environment.apiUrl + '/recommend/content';


  constructor(private http:HttpClient) { }
   getContentBased(movieId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api}/content/${movieId}`);
  }

  getCollaborative(userId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api}/collaborative/${userId}`);
  }
  getRecommendations(movieId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api}/${movieId}`);
  }
}
