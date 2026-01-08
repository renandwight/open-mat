from django.urls import path
from .views import CreateReview, ReviewDetail, MyReviews

urlpatterns = [
    path("", CreateReview.as_view(), name="create-review"),
    path("<int:id>/", ReviewDetail.as_view(), name="review-detail"),
    path("me/", MyReviews.as_view(), name="my-reviews"), #1 1/7/2025 - I added this. see review_app views.py
]