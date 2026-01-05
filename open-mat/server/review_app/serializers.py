from rest_framework.serializers import ModelSerializer
from user_app.serializers import ClientSerializer
from .models import Review

# serializer to GET
class ReviewReadSerializer(ModelSerializer):
    client = ClientSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'

# serializer to POST or PUT
class ReviewWriteSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = ['gym', 'rating', 'comment']