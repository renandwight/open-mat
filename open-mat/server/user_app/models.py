from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class client(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
User = settings.AUTH_USER_MODEL
class User(models.Model):
    
    user1 = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='user'
        
    )
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name=models.CharField(max_length=50, blank=True)
    street = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=2, blank=True)
    zip = models.IntegerField(null=True, blank=True)
    is_owner = models.BooleanField(null=True, blank=True)
    is_verified = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    