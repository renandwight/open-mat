from django.urls import path
from .views import Register, Login, Logout, Info, UserView



urlpatterns = [
    
    path('user/', Info.as_view(),name='info'),
    path('register/', Register.as_view(), name='register'),
    path('login/', Login.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('users/profile/', UserView.as_view(), name='user_profile' ),
    
]