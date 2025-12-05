from pydantic import BaseModel
from typing import Optional

class MovieCreate(BaseModel):
    title: str
    genre: str
    language: str
    director: str
    cast: str
    description: str
    release_year: int
    poster_url: Optional[str] = None

class MovieUpdate(BaseModel):
    title: Optional[str] = None
    genre: Optional[str] = None
    language: Optional[str] = None
    director: Optional[str] = None
    cast: Optional[str] = None
    description: Optional[str] = None
    release_year: Optional[int] = None
    poster_url: Optional[str] = None

class MovieResponse(MovieCreate):
    id: int

    class Config:
        orm_mode = True
