from rest_framework import serializers
from .models import Favorite
from gym_app.serializers import GymSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    gym_details = GymSerializer(source='gym', read_only=True)
    gym = serializers.PrimaryKeyRelatedField(queryset=Favorite._meta.get_field('gym').related_model.objects.all(), write_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'gym', 'gym_details', 'created_at']
        read_only_fields = ['user', 'created_at']