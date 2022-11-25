from pymongo import MongoClient
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

client = MongoClient('mongodb+srv://withstudy:withstudy@cluster0.letda.mongodb.net/?retryWrites=true&w=majority')

db = client.quiz

#print(db.quiz_content.find_one({'Number':1}))

ratings = pd.read_csv("./ratings.csv")

def rating_to_bool(rate):
    if rate <= 2.5: return -100
    else: return 100

ratings["rating"] = ratings["rating"].apply(rating_to_bool)

ratings.drop('timestamp', axis = 1, inplace=True)

movie_user_rating = ratings.pivot_table('rating', index = 'movieId', columns = 'userId')
my_user_rating = movie_user_rating.loc[1:20]
nan_matrix_zero = my_user_rating.fillna(0)
cos_sim_array = cosine_similarity(nan_matrix_zero)
item_based_collabor = pd.DataFrame(data = cos_sim_array, index = my_user_rating.index, columns = my_user_rating.index)

def get_item_based_collabor(movieId):
    return item_based_collabor[movieId].sort_values(ascending=False)[1:2]

for i in range(1,21):
    result = get_item_based_collabor(i)
    print(result)
    twins = int(result.index[0])
    mydoc = {"Number" : i, "Chapter" : 1}
    newdoc = {"$set": {'twins': twins}}
    db.quiz_content.update_one(mydoc, newdoc)