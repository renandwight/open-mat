from rest_framework import serializers
from .models import Favorite
from gym_app.serializers import GymSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    gym = GymSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'gym', 'created_at']
        read_only_fields = ['user', 'created_at']