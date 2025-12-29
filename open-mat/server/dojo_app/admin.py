from django.contrib import admin

from django.contrib import admin
from .models import Technique

@admin.register(Technique)
class TechniqueAdmin(admin.ModelAdmin):
    """Admin interface for BJJ techniques."""
    
    list_display = (
        'name',
        'category',
        'difficulty',
        'position',
        'created_at'
    )
    
    list_filter = (
        'category',
        'difficulty',
        'position',
    )
    
    search_fields = (
        'name',
        'description'
    )
    
    ordering = ('category', 'difficulty', 'name')
    
    readonly_fields = ('created_at', 'updated_at')
