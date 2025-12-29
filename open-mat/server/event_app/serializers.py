from rest_framework.serializers import ModelSerializer
from .models import Event

class EventSerializer(ModelSerializer):
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
        ]

        read_only_fields = ["id"]