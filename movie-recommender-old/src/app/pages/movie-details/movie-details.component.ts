import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../core/models/movie.model';
import { RatingService } from '../../core/services/rating.service';
import { RecommendationService } from '../../core/services/recommendation.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movie!: Movie;
  selectedRating = 0;
  // userId = 1;
  recommendations: Movie[] = [];
  showRecommendations = false;
defaultPoster = 'https://placehold.co/300x450?text=No+Poster';
  showRating = false;



  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ratingService: RatingService,
    private recommendationService: RecommendationService,
      private router: Router,
     private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    // this.movieService.getMovieById(movieId).subscribe({
    //   next: data => this.movie = data
    // });
    this.loadMovie(movieId);
    this.loadRecommendations(); 
  }

  loadMovie(movieId: number) {
    this.movieService.getMovieById(movieId).subscribe(res => {
      this.movie = res;
    });
  }
  selectRating(star: number) {
    this.selectedRating = star;
  }

  
  submitRating() {
    const payload = {
      movie_id: this.movie.id,
      rating: this.selectedRating
    };

    this.ratingService.rateMovie(payload).subscribe(() => {
      this.loadMovie(this.movie.id);
      alert('Rating submitted!');
    });
  }

  // loadRecommendations() {
  //   this.recommendationService
  //     .getContentBased(this.movie.id)
  //     .subscribe(res => {
  //       this.recommendations = res;
  //       this.showRecommendations = true;
  //     });
  // }
  loadRecommendations() {
  this.recommendationService
    .getRecommendations(this.movie.id)
    .subscribe({
      next: (data) => {
        const currentGenre = this.movie.genre?.toLowerCase() || '';
        const currentDirector = this.movie.director?.toLowerCase() || '';

        this.recommendations = data
          // ❌ remove same movie
          .filter(m => m.id !== this.movie.id)

          // ✅ relevance scoring
          .map(m => {
            let score = 0;

            if (m.genre?.toLowerCase().includes(currentGenre)) {
              score += 2;
            }

            if (m.director?.toLowerCase() === currentDirector) {
              score += 1;
            }

            return { ...m, _score: score };
          })

          // ✅ sort by relevance score
          .sort((a, b) => b._score - a._score)

          // ✅ limit recommendations
          .slice(0, 4);
      },
      error: err => console.error('Recommendation error', err)
    });
}

  
  toggleRating() {
  this.showRating = !this.showRating;
}

// onImageError(event: Event) {
//   const img = event.target as HTMLImageElement;
//   img.src = this.defaultPoster;
// }
logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}

goBack() {
  this.router.navigate(['/movies']);
}


}
