from pydantic import BaseModel

class RatingCreate(BaseModel):
    # user_id: int
    movie_id: int
    rating: float
