from rest_framework.serializers import (
    ModelSerializer, 
    ValidationError, 
    PrimaryKeyRelatedField, 
    IntegerField,
    StringRelatedField,
)

from .models import Event
from gym_app.models import Gym

class GymEventSerializer(ModelSerializer):
    class Meta:
        model = Gym
        fields = ["id", "name"]

class EventReadSerializer(ModelSerializer):
    gym_id=PrimaryKeyRelatedField(source="gym", read_only=True)
    gym_name=StringRelatedField(source="gym", read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "gym_id",
            "gym_name",
            "event_date",
            "gi",
            "fee",
            "open_class",
        ]

        read_only_fields = ["id", "gym_id", "gym_name"]

class EventWriteSerializer(ModelSerializer):
    gym_id=PrimaryKeyRelatedField(queryset=Gym.objects.all(), source="gym", write_only=True)

    class Meta:
        model = Event
        fields = [
            "gym_id",
            "event_date",
            "gi",
            "fee",
            "open_class",
        ]

    def validate_fee(self, value):
        if value is None:
            return value
        if value < 0:
            raise ValidationError("Fee cannot be negative.")
        return value
