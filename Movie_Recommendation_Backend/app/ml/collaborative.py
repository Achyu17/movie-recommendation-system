import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def collaborative_recommendations(ratings, user_id, top_n=5):
    df = pd.DataFrame(ratings)

    matrix = df.pivot_table(
        index="user_id",
        columns="movie_id",
        values="rating"
    ).fillna(0)

    sim_matrix = cosine_similarity(matrix)
    sim_df = pd.DataFrame(sim_matrix, index=matrix.index, columns=matrix.index)

    similar_users = sim_df[user_id].sort_values(ascending=False).index[1:]

    weighted_scores = matrix.loc[similar_users].mean().sort_values(ascending=False)

    recommended_movies = weighted_scores.index.tolist()[:top_n]

    return recommended_movies
