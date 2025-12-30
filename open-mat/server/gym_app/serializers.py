from rest_framework import serializers
from .models import Gym
from event_app.serializers import EventReadSerializer
class GymSerializer(serializers.ModelSerializer):
    gym_events = EventReadSerializer(many=True, read_only=True)
    class Meta:
        model = Gym
        fields = ['id','name','gym_events']
    