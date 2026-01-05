from django.db import models
from user_app.models import Client
from gym_app.models import Gym
from django.conf import settings
from .validators import validate_rating

# Create your models here.
class Review(models.Model):
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    gym = models.ForeignKey(
        Gym,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    rating = models.IntegerField(
        validators=[validate_rating]
    )
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)