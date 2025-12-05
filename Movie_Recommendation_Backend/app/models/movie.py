from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    
    title = Column(String(255))
    genre = Column(String(255))
    language = Column(String(50))
    director = Column(String(100))
    cast = Column(Text)
    description = Column(Text)
    release_year = Column(Integer)
    poster_url = Column(String(500))
