# api/serializers.py

from rest_framework import serializers

class GenreSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)

class MovieSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=200)
    genres = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=True
    )
