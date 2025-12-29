from rest_framework.serializers import ModelSerializer
from user_app.serializers import UserSerializer
from .models import Review

# serializer to GET
class ReviewReadSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'

# serializer to POST or PUT
class ReviewWriteSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = ['gym', 'rating', 'comment']