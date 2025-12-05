from fastapi import FastAPI
from app.database import Base, engine
from app.models.user import User
from app.models.movie import Movie
from app.models.rating import Rating
from app.routes.auth_routes import router as auth_router
from app.routes.movie_routes import router as movie_router
from app.routes.rating_routes import router as rating_router
from app.routes.recommendation_routes import router as rec_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Movie Recommendation API")

app.include_router(auth_router)
app.include_router(movie_router)
app.include_router(rating_router)
app.include_router(rec_router)


@app.get("/")
def root():
    return {"message": "Backend running successfully"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)