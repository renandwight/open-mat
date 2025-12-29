from rest_framework.serializers import ModelSerializer, ValidationError
from .models import Event

class EventReadSerializer(ModelSerializer):
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
    class Meta:
        model = Event
        fields = [
            "gym",
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
