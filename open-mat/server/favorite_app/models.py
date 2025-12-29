from django.db import models
from django.conf import settings

class Favorite(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='favorites'
    )
    gym = models.ForeignKey(
        'gym_app.Gym',
        on_delete=models.CASCADE,
        related_name='favorites'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'gym']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} - {self.gym.name}"