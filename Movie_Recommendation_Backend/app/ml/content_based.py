import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_content_recommendations(movies, movie_id, top_n=5):
    df = pd.DataFrame(movies)

    df["combined"] = (
        df["genre"].fillna("") + " " +
        df["description"].fillna("") + " " +
        df["director"].fillna("") + " " +
        df["cast"].fillna("")
    )

    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(df["combined"])

    cosine_sim = cosine_similarity(tfidf_matrix)

    idx = df.index[df["id"] == movie_id][0]

    scores = list(enumerate(cosine_sim[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    top_movies = scores[1:top_n + 1]
    movie_ids = [df.iloc[i[0]]["id"] for i in top_movies]

    return movie_ids
