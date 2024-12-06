# api/data.py

# Hardcoded genres
GENRES = [
    {'id': 1, 'name': 'Action'},
    {'id': 2, 'name': 'Comedy'},
    {'id': 3, 'name': 'Drama'},
    {'id': 4, 'name': 'Horror'},
    {'id': 5, 'name': 'Sci-Fi'},
]

# Hardcoded movies
MOVIES = [
    {'id': 1, 'title': 'Inception', 'genres': [1, 5]},
    {'id': 2, 'title': 'The Matrix', 'genres': [1, 5]},
    {'id': 3, 'title': 'The Godfather', 'genres': [3]},
    {'id': 4, 'title': 'Toy Story', 'genres': [2, 5]},
    {'id': 5, 'title': 'Get Out', 'genres': [4, 1]},
    {'id': 6, 'title': 'The Dark Knight', 'genres': [1, 3]},
    {'id': 7, 'title': 'Parasite', 'genres': [3, 2]},
    {'id': 8, 'title': 'Interstellar', 'genres': [1, 5, 3]},
    {'id': 9, 'title': 'Avengers: Endgame', 'genres': [1, 5]},
    {'id': 10, 'title': 'The Conjuring', 'genres': [4]},
]
