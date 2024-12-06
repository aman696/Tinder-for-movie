# api/urls.py

from django.urls import path
from .views import GenreList, MovieList, CommonSuggestion

urlpatterns = [
    path('genres/', GenreList.as_view(), name='genre-list'),
    path('movies/', MovieList.as_view(), name='movie-list'),
    path('suggestion/', CommonSuggestion.as_view(), name='common-suggestion'),
]
    