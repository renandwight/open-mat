from rest_framework import serializers
from .models import Gym
from event_app.serializers import EventSerializer
class GymSerializer(serializers.ModelSerializer):
    gym_events = EventSerializer(many=True, read_only=True)
    class Meta:
        model = Gym
        fields = ['id','name','gym_events']
    