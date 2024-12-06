# api/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import GenreSerializer, MovieSerializer
from .data import GENRES, MOVIES
import random

class GenreList(APIView):
    """
    GET: Retrieve all available genres.
    """
    def get(self, request):
        serializer = GenreSerializer(GENRES, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MovieList(APIView):
    """
    POST: Retrieve movies for both users based on selected genres.
    Expected JSON payload:
    {
        "user1_genres": [genre_ids],
        "user2_genres": [genre_ids]
    }
    """
    def post(self, request):
        user1_genres = request.data.get('user1_genres', [])
        user2_genres = request.data.get('user2_genres', [])

        # Validate input
        if not isinstance(user1_genres, list) or not isinstance(user2_genres, list):
            return Response({"error": "Genres must be provided as lists."}, status=status.HTTP_400_BAD_REQUEST)

        # Find movies matching each user's genres
        user1_movies = [movie for movie in MOVIES if set(user1_genres).intersection(set(movie['genres']))]
        user2_movies = [movie for movie in MOVIES if set(user2_genres).intersection(set(movie['genres']))]

        # Limit to 5 movies each
        user1_swipe = random.sample(user1_movies, min(5, len(user1_movies))) if user1_movies else []
        user2_swipe = random.sample(user2_movies, min(5, len(user2_movies))) if user2_movies else []

        # Serialize the data
        serializer1 = MovieSerializer(user1_swipe, many=True)
        serializer2 = MovieSerializer(user2_swipe, many=True)

        return Response({
            'user1_swipe': serializer1.data,
            'user2_swipe': serializer2.data
        }, status=status.HTTP_200_OK)

class CommonSuggestion(APIView):
    """
    POST: Provide a common movie suggestion based on user selections.
    Expected JSON payload:
    {
        "user1_selection": [movie_ids],
        "user2_selection": [movie_ids]
    }
    """
    def post(self, request):
        user1_selection = set(request.data.get('user1_selection', []))
        user2_selection = set(request.data.get('user2_selection', []))

        # Validate input
        if not isinstance(user1_selection, set) or not isinstance(user2_selection, set):
            return Response({"error": "Selections must be provided as lists."}, status=status.HTTP_400_BAD_REQUEST)

        # Find common movie IDs
        common_movie_ids = user1_selection.intersection(user2_selection)

        if common_movie_ids:
            # Select the first common movie
            common_movie_id = next(iter(common_movie_ids))
            common_movie = next((movie for movie in MOVIES if movie['id'] == common_movie_id), None)
            serializer = MovieSerializer(common_movie)
            return Response({'common_movie': serializer.data}, status=status.HTTP_200_OK)
        else:
            # If no common movie, suggest a random one
            suggestion = random.choice(MOVIES) if MOVIES else None
            if suggestion:
                serializer = MovieSerializer(suggestion)
                return Response({'common_movie': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'common_movie': None}, status=status.HTTP_200_OK)
