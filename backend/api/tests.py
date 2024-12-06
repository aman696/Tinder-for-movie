# api/tests.py

from django.test import TestCase, Client
from django.urls import reverse
import json

class APITestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_genres(self):
        response = self.client.get(reverse('genre-list'))
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)
        self.assertGreater(len(response.json()), 0)

    def test_post_movies(self):
        payload = {
            "user1_genres": [1, 5],
            "user2_genres": [2, 3]
        }
        response = self.client.post(reverse('movie-list'), data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('user1_swipe', data)
        self.assertIn('user2_swipe', data)

    def test_post_common_suggestion_with_common(self):
        payload = {
            "user1_selection": [1, 2, 5],
            "user2_selection": [2, 3, 4]
        }
        response = self.client.post(reverse('common-suggestion'), data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('common_movie', data)
        self.assertIsNotNone(data['common_movie'])

    def test_post_common_suggestion_without_common(self):
        payload = {
            "user1_selection": [1, 5],
            "user2_selection": [2, 3]
        }
        response = self.client.post(reverse('common-suggestion'), data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('common_movie', data)
        self.assertIsNotNone(data['common_movie'])
