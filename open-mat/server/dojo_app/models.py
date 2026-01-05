from django.db import models

# Create your models here.
from django.db import models

class Technique(models.Model):
    # Category choices
    CATEGORY_CHOICES = [
        ('submissions', 'Submissions'),
        ('escapes', 'Escapes'),
        ('sweeps', 'Sweeps'),
        ('passes', 'Guard Passes'),
        ('takedowns', 'Takedowns'),
        ('positions', 'Positions'),
    ]
    # Difficulty choices
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    # Position choices
    POSITION_CHOICES = [
        ('guard', 'Guard'),
        ('closed_guard', 'Closed Guard'),
        ('open_guard', 'Open Guard'),
        ('half_guard', 'Half Guard'),
        ('mount', 'Mount'),
        ('side_control', 'Side Control'),
        ('back_control', 'Back Control'),
        ('standing', 'Standing'),
        ('neutral', 'Neutral'),
    ]
    name = models.CharField(
        max_length=200,
        help_text="Name of the technique (e.g., 'Armbar from Guard')"
    )
    
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        help_text="Type of technique"
    )

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default='beginner',
        help_text="Skill level required"
    )

    youtube_url = models.URLField(
        max_length=500,
        help_text="Full YouTube URL"
    )

    description = models.TextField(
        help_text="Detailed explanation of the technique"
    )
    
    position = models.CharField(
        max_length=50,
        choices=POSITION_CHOICES,
        help_text="Starting position"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['category', 'difficulty', 'name']
        verbose_name = 'Technique'
        verbose_name_plural = 'Techniques'
    
    def __str__(self):
        return f"{self.name} ({self.get_difficulty_display()})"
    
    def get_youtube_embed_url(self):
        """Convert YouTube URL to embed format"""
        if not self.youtube_url:
            return None
        
        url = self.youtube_url
        
        # Handle youtube.com/shorts/VIDEO_ID
        if 'youtube.com/shorts/' in url:
            video_id = url.split('shorts/')[1].split('?')[0]
            return f'https://www.youtube.com/embed/{video_id}'
        
        # Handle youtube.com/watch?v=VIDEO_ID
        elif 'watch?v=' in url:
            video_id = url.split('watch?v=')[1].split('&')[0]
            return f'https://www.youtube.com/embed/{video_id}'
        
        # Handle youtu.be/VIDEO_ID
        elif 'youtu.be/' in url:
            video_id = url.split('youtu.be/')[1].split('?')[0]
            return f'https://www.youtube.com/embed/{video_id}'
        
        return url