from django.db import models
from gym_app.models import Gym
from user_app.models import User

class Event(models.Model):
    gym=models.ForeignKey(Gym, on_delete=models.CASCADE, related_name='gym_events')
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_events')
    event_date=models.DateTimeField()
    gi=models.BooleanField()
    fee=models.DecimalField(max_digits=5, decimal_places=2)
    open_class=models.BooleanField()
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.gym} - {self.user} - {self.event_date}"