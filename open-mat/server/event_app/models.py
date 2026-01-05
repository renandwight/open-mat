from django.db import models
from gym_app.models import Gym
from user_app.models import User
from django.conf import settings

class Event(models.Model):
    gym=models.ForeignKey(Gym, on_delete=models.CASCADE, related_name='gym_events')
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_events')
    event_date=models.DateTimeField()
    gi=models.BooleanField(default=False)
    fee=models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    open_class=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.gym} - {self.user} - {self.event_date}"