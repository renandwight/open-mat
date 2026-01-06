from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status as s
from .serializers import ClientSerializer,   UserSerializer
from rest_framework.authtoken.models import Token
from .models import User, Client

# Create your views here.

class UserPermission(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Register(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = data.get('email')
        serializer = ClientSerializer(data=data)
        if serializer.is_valid():
            user= serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'client': user.email, 'token':token.key}, status=s.HTTP_201_CREATED)
        return Response(serializer.errors, status=s.HTTP_400_BAD_REQUEST)
class Login(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = data.get('email')
        user = authenticate(
            username= data.get('username'), password=data.get('password')

        )
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                
                'client' : user.email,
                'token' : token.key
            }, status= s.HTTP_200_OK)
        else:
            return Response('not a user', status=s.HTTP_404_NOT_FOUND)

class Logout(UserPermission):
    def post(self, request):
        try: 
            request.user.auth_token.delete()
        except:
            pass
        return Response('logged out', status=s.HTTP_204_NO_CONTENT)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ClientSerializer(request.user)
        return Response(serializer.data)
    
class UserView(UserPermission):
    
    def get(self, request):
        user_profile, _ = User.objects.get_or_create(user_x=request.user)
        serializer = UserSerializer(user_profile) 
        return Response(serializer.data, status=s.HTTP_200_OK)
    def post(self, request):
        user_profile, _ = User.objects.get_or_create(user_x=request.user)
        serializer = UserSerializer(user_profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=s.HTTP_201_CREATED)
    def put(self, request):
        user_profile =User.objects.get(user_x=request.user)
        serializer = UserSerializer(user_profile, data=request.data, partial=True)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=s.HTTP_200_OK)
    def delete(self,  request):
        user_profile = User.objects.get(user_x=request.user)
        user_profile.delete()
        return Response(status=s.HTTP_204_NO_CONTENT)
        
