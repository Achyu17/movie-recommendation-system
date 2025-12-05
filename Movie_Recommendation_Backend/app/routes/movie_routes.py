from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import or_ 
from sqlalchemy import func
from app.models.rating import Rating


from app.database import get_db
from app.models.movie import Movie
from app.schemas.movie_schema import MovieCreate, MovieResponse,MovieUpdate

router = APIRouter(prefix="/movies", tags=["Movies"])

# ✅ ADD MOVIE
@router.post("/", response_model=MovieResponse)
def add_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    db_movie = Movie(**movie.dict())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie


# ✅ GET ALL MOVIES (Pagination)
@router.get("/", response_model=List[MovieResponse])
def get_movies(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, le=50),
    db: Session = Depends(get_db)
):
    return db.query(Movie).offset(skip).limit(limit).all()


# ✅ GET MOVIE BY ID
# @router.get("/{movie_id}", response_model=MovieResponse)
# def get_movie(movie_id: int, db: Session = Depends(get_db)):
#     movie = db.query(Movie).filter(Movie.id == movie_id).first()
#     if not movie:
#         raise HTTPException(status_code=404, detail="Movie not found")
#     return movie


# ✅ SEARCH MOVIES
# @router.get("/search/", response_model=List[MovieResponse])
# def search_movies(
#     keyword: str,
#     db: Session = Depends(get_db)
# ):
#     return db.query(Movie).filter(
#         Movie.title.ilike(f"%{keyword}%"),
#         Movie.cast.ilike(f"%{keyword}%"),
#         Movie.director.ilike(f"%{keyword}%")
#     ).all()
@router.get("/search/", response_model=List[MovieResponse])
def search_movies(
    keyword: str,
    db: Session = Depends(get_db)
):
    return db.query(Movie).filter(
        or_(
            Movie.title.ilike(f"%{keyword}%"),
            Movie.cast.ilike(f"%{keyword}%"),
            Movie.director.ilike(f"%{keyword}%")
        )
    ).all()

# ✅ UPDATE MOVIE
@router.put("/{movie_id}")
def update_movie(
    movie_id: int,
    movie_data: MovieUpdate,
    db: Session = Depends(get_db)
):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    for field, value in movie_data.dict(exclude_unset=True).items():
        setattr(movie, field, value)

    db.commit()
    db.refresh(movie)

    return {"message": "Movie updated successfully", "movie": movie}


@router.delete("/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    db.delete(movie)
    db.commit()

    return {"message": f"Movie with id {movie_id} deleted successfully"}


@router.get("/{movie_id}")
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    avg_rating = (
        db.query(func.avg(Rating.rating))
        .filter(Rating.movie_id == movie_id)
        .scalar()
    )

    return {
        "id": movie.id,
        "title": movie.title,
        "genre": movie.genre,
        "language": movie.language,
        "director": movie.director,
        "cast": movie.cast,
        "description": movie.description,
        "release_year": movie.release_year,
        "poster_url": movie.poster_url,
        "average_rating": round(avg_rating, 1) if avg_rating else 0
    }
