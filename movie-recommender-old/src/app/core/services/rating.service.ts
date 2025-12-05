import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../models/rating.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RatingService {
    private api = environment.apiUrl + '/ratings';

  constructor(private http:HttpClient) { }
   rateMovie(data: Rating): Observable<any> {
    return this.http.post<any>(this.api, data);
  }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.api);
  }
}
