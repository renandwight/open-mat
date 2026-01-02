from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Favorite
from .serializers import FavoriteSerializer


class FavoriteListCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user.user_profile)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user.user_profile)
            return Response(
                {"message": "Favorite added", "favorite": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FavoriteDelete(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, gym_id):
        try:
            favorite = Favorite.objects.get(
                gym_id=gym_id,
                user=request.user.user_profile
            )
            favorite.delete()
            return Response(
                {"message": "Favorite deleted"},
                status=status.HTTP_200_OK
            )
        except Favorite.DoesNotExist:
            return Response(
                {"error": "Favorite not found"},
                status=status.HTTP_404_NOT_FOUND
            )