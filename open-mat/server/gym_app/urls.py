from django.urls import path
from .views import All_Gyms, A_Gym, Nearby_Gyms,Filtered_Gyms

urlpatterns = [
    path('', All_Gyms.as_view(), name='gyms-list'),
    path('<int:id>/', A_Gym.as_view(), name='detailed-gym'),
    path('search/',Filtered_Gyms.as_view(), name="search-results"),
    path('nearby/', Nearby_Gyms.as_view(), name='nearby-gyms' )
]