from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.authtoken.models import Token
from .models import Client, User
from rest_framework import serializers



class ClientSerializer(ModelSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = Client
        fields = ["id", "email", "password", "token"]
        extra_kwargs = {'password':{'write_only': True}}
    def get_token(self, client):
        token, _= Token.objects.get_or_create(user=client)
        return token.key
    def create(self, validated_data):
        client = Client.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username', validated_data['email']),
            password=validated_data['password'],
        )
        User.objects.create(user_x=client)
        return client
    
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user_x.email", read_only=True)
    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "street",
            "state",
            "zip",
            "is_owner",
            "is_verified",
            "created_at",
            "updated_at",
        ]
        
        read_only_fields = ["is_owner", "is_verified", "created_at", "updated_at"]