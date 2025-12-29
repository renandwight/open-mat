from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class Client(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
User1 = settings.AUTH_USER_MODEL
class User(models.Model):
    
    user_x = models.OneToOneField(
        User1,
        on_delete=models.CASCADE,
        related_name='user_profile'
        
    )
    
    first_name = models.CharField(max_length=50, blank=True)
    last_name=models.CharField(max_length=50, blank=True)
    street = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=2, blank=True)
    zip = models.IntegerField(null=True, blank=True)
    is_owner = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_x.email

    