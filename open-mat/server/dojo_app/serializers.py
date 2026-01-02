from rest_framework import serializers
from .models import Technique

class TechniqueSerializer(serializers.ModelSerializer):
    """Full serializer for Technique model."""
    
    category_display = serializers.CharField(
        source='get_category_display',
        read_only=True
    )
    difficulty_display = serializers.CharField(
        source='get_difficulty_display',
        read_only=True
    )
    position_display = serializers.CharField(
        source='get_position_display',
        read_only=True
    )
    youtube_embed_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Technique
        fields = [
            'id',
            'name',
            'category',
            'category_display',
            'difficulty',
            'difficulty_display',
            'position',
            'position_display',
            'youtube_url',
            'youtube_embed_url',
            'description',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_youtube_embed_url(self, obj):
        return obj.get_youtube_embed_url()


class TechniqueListSerializer(serializers.ModelSerializer):
    """Lighter serializer for list views."""
    
    category_display = serializers.CharField(
        source='get_category_display',
        read_only=True
    )
    difficulty_display = serializers.CharField(
        source='get_difficulty_display',
        read_only=True
    )
    
    class Meta:
        model = Technique
        fields = [
            'id',
            'name',
            'category',
            'category_display',
            'difficulty',
            'difficulty_display',
            'youtube_url',
        ]
        read_only_fields = ['id']