

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.rating import Rating
from app.models.movie import Movie
from app.models.user import User
from app.utils.auth_dependency import get_current_user
from app.schemas.rating_schema import RatingCreate

router = APIRouter(prefix="/ratings", tags=["Ratings"])


# @router.post("/")
# def rate_movie(rating: RatingCreate, db: Session = Depends(get_db)):

#     # ✅ check user
#     user = db.query(User).filter(User.id == rating.user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # ✅ check movie
#     movie = db.query(Movie).filter(Movie.id == rating.movie_id).first()
#     if not movie:
#         raise HTTPException(status_code=404, detail="Movie not found")

#     # ✅ check existing rating
#     db_rating = db.query(Rating).filter(
#         Rating.user_id == rating.user_id,
#         Rating.movie_id == rating.movie_id
#     ).first()

#     if db_rating:
#         db_rating.rating = rating.rating
#     else:
#         db_rating = Rating(
#             user_id=rating.user_id,
#             movie_id=rating.movie_id,
#             rating=rating.rating
#         )
#         db.add(db_rating)

#     db.commit()

#     return {"message": "Rating saved successfully"}

@router.post("/")
def rate_movie(
    rating: RatingCreate,
    user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["user_id"]

    db_rating = db.query(Rating).filter(
        Rating.user_id == user_id,
        Rating.movie_id == rating.movie_id
    ).first()

    if db_rating:
        db_rating.rating = rating.rating
    else:
        db_rating = Rating(
            user_id=user_id,
            movie_id=rating.movie_id,
            rating=rating.rating
        )
        db.add(db_rating)

    db.commit()
    return {"message": "Rating saved successfully"}