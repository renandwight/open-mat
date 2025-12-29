from django.urls import path
from .views import TechniqueList, TechniqueDetail

app_name = 'dojo_app'

urlpatterns = [
    path('techniques/', TechniqueList.as_view(), name='technique-list'),
    path('techniques/<int:pk>/', TechniqueDetail.as_view(), name='technique-detail'),
]