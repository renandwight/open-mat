from rest_framework import serializers
from .models import Gym
from event_app.serializers import EventReadSerializer
class GymSerializer(serializers.ModelSerializer):
    gym_events = EventReadSerializer(many=True, read_only=True)
    class Meta:
        model = Gym
        fields = [
            'id', 'name', 'street', 'city', 'state', 'zip',
            'latitude', 'longitude', 'gym_events'
        ]
    
    def get_distance(self, obj):
        distances = self.context.get("distances", {})
        return round(distances.get(obj, 0), 2)