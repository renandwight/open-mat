from rest_framework.serializers import ModelSerializer, ValidationError, PrimaryKeyRelatedField
from .models import Event
# from gym_app.serializers import GymSerializer
from gym_app.models import Gym
from user_app.serializers import UserSerializer, ClientSerializer



class GymEventSerializer(ModelSerializer):
    class Meta:
        model = Gym
        fields = ["id","name"]

class EventReadSerializer(ModelSerializer):
    gym=GymEventSerializer(read_only=True)
    user=ClientSerializer(read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "gym",
            "user",
            "event_date",
            "gi",
            "fee",
            "open_class",
            "created_at",
            "updated_at",
        ]

        read_only_fields = ["id", "created_at", "updated_at"]

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
