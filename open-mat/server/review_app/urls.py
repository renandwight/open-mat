from django.urls import path
from .views import GymReviews, CreateReview, ReviewDetail, MyReviews

urlpatterns = [
    path("gyms/<int:gym_id>/reviews/", GymReviews.as_view(), name="gym-reviews"),
    path("", CreateReview.as_view(), name="create-review"),
    path("<int:id>/", ReviewDetail.as_view(), name="review-detail"),
    path("me/", MyReviews.as_view(), name="my-reviews"), #1 1/7/2025 - I added this. see review_app views.py
    
]