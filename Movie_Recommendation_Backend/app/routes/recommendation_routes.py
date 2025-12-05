from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.movie import Movie
from app.ml.content_based import get_content_recommendations
from app.ml.collaborative import collaborative_recommendations
from app.models.rating import Rating

router = APIRouter(prefix="/recommend", tags=["Recommendations"])

@router.get("/content/{movie_id}")
def content_based_recommend(movie_id: int, db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    movies_data = [m.__dict__ for m in movies]

    recommended_ids = get_content_recommendations(movies_data, movie_id)

    return db.query(Movie).filter(Movie.id.in_(recommended_ids)).all()

@router.get("/collaborative/{user_id}")
def collaborative_recommend(user_id: int, db: Session = Depends(get_db)):
    ratings = db.query(Rating).all()
    rating_data = [r.__dict__ for r in ratings]

    movie_ids = collaborative_recommendations(rating_data, user_id)

    return db.query(Movie).filter(Movie.id.in_(movie_ids)).all()