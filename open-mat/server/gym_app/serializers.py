from rest_framework import serializers
from .models import Gym
from event_app.serializers import EventReadSerializer
from review_app.serializers import ReviewReadSerializer
class GymSerializer(serializers.ModelSerializer):
    gym_events = EventReadSerializer(many=True, read_only=True)
    reviews = ReviewReadSerializer(many=True, read_only=True)
    distance = serializers.SerializerMethodField()

    class Meta:
        model = Gym
        fields = [
            'id', 'name', 'street', 'city', 'state', 'created_by','zip',
            'latitude', 'longitude', 'distance', 'gym_events', 'reviews'
        ]
    
    def get_distance(self, obj):
        distances = self.context.get("distances", {})
        return round(distances.get(obj.id, 0), 2)