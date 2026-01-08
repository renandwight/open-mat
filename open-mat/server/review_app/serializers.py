from rest_framework.serializers import ModelSerializer, SerializerMethodField
from user_app.models import Client
from .models import Review

class ReviewClientSerializer(ModelSerializer):
    username = SerializerMethodField()

    class Meta:
        model = Client
        fields = ["username"]

    def get_username(self, client):
        if client.username:
            if "@" in client.username:
                return client.username.split("@")[0]
            return client.username
        email = client.email or ""
        return email.split("@")[0] if "@" in email else email

# serializer to GET
class ReviewReadSerializer(ModelSerializer):
    client = ReviewClientSerializer(read_only=True)
    gym_name = SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "client",
            "gym",
            "gym_name",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        ]

    def get_gym_name(self, review):
        if review.gym:
            return review.gym.name
        return ""

# serializer to POST or PUT
class ReviewWriteSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = ['gym', 'rating', 'comment']
