from django.db import models
from user_app.models import User
from django.utils import timezone

# Create your models here.
class Gym(models.Model):
    #name field for gyms
    name = models.CharField(maxLength=200, unique=True, blank=False, null=False)
    street = models.CharField(maxLength=200, unique=False, blank=False, null=False)
    city = models.CharField(maxLength=200, unique=False, blank=False, null=False)
    state = models.TextField(maxLength=2, unique=False, blank=False)
    zip = models.IntegerField(max_length=5, unique=False)
    latitude = models.IntegerField(max_length=2, unique=False)
    longitude = models.IntegerField(max_length=2, unique=False)
    created_by = models.ForeignKey(User, related_name='Gym')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=created_at)
    
    
     
    def __str__(self):
        return f"{self.name} located at {self.street} {self.city}, {self.state} {self.zip}"
       