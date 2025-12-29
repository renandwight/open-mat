from django.urls import path
from .views import GymReviews, CreateReview, ReviewDetail

urlpatterns = [
    path("gyms/<int:gym_id>/reviews/", GymReviews.as_view(), name="gym-reviews"),
    path("reviews/", CreateReview.as_view(), name="create-review"),
    path("reviews/<int:id>/", ReviewDetail.as_view(), name="review-detail"),
]