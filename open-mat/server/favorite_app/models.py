from django.db import models
from user_app.models import User
from gym_app.models import Gym

class Favorite(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='favorites'
    )
    gym = models.ForeignKey(
        Gym,
        on_delete=models.CASCADE,
        related_name='favorites'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'gym']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} - {self.gym.name}"