import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
 defaultPoster = 'https://placehold.co/300x450?text=No+Poster';

  constructor(private movieService: MovieService, private authService: AuthService,
    private router: Router) { }

  // ngOnInit(): void {
  //   console.log('MovieListComponent loaded');
  //   this.movieService.getMovies().subscribe({

  //     next: res => this.movies = res,
  //     error: err => console.error(err)
  //   });
  // }
  ngOnInit(): void {
    console.log('MovieListComponent loaded');

    this.movieService.getMovies().subscribe({
      next: data => {
        console.log('MOVIES FROM API 👉', data); // ✅ IMPORTANT
        this.movies = data;
      },
      error: err => {
        console.error('API ERROR 👉', err);
      }
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
//   onImageError(event: Event) {
//   const img = event.target as HTMLImageElement;
//   img.src = this.defaultPoster;
// }
}
