from django.shortcuts import render
from rest_framework.views import APIView
from user_app.views import UserPermission
from rest_framework.response import Response
from rest_framework import status as s
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Review
from .serializers import ReviewReadSerializer, ReviewWriteSerializer

# Create your views here.



# GET /api/gyms/<gym_id>/reviews/
class GymReviews(APIView):
    permission_classes = [AllowAny]

    def get(self, gym_id):
        reviews = Review.objects.filter(gym_id=gym_id).order_by("-created_at")
        return Response(ReviewReadSerializer(reviews, many=True).data, status=s.HTTP_200_OK)





# POST /api/reviews/
class CreateReview(UserPermission):

    def post(self, request):
        serializer = ReviewWriteSerializer(data=request.data)
        if serializer.is_valid():
            review = serializer.save(client=request.user)
            return Response(ReviewReadSerializer(review).data, status=s.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=s.HTTP_400_BAD_REQUEST)



# PUT /api/reviews/<id>/
# DELETE /api/reviews/<id>/
class ReviewDetail(UserPermission):

    def put(self, request, id):
        review = get_object_or_404(Review, id=id)

        # only owner can edit
        if review.user != request.user:
            return Response({"detail": "Not authorized."}, status=s.HTTP_403_FORBIDDEN)

        serializer = ReviewWriteSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            review = serializer.save()
            return Response(ReviewReadSerializer(review).data, status=s.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=s.HTTP_400_BAD_REQUEST)



    def delete(self, request, id):
        review = get_object_or_404(Review, id=id)

        # only owner can delete
        if review.user != request.user:
            return Response({"detail": "Not authorized."}, status=s.HTTP_403_FORBIDDEN)

        review.delete()
        return Response(status=s.HTTP_204_NO_CONTENT)