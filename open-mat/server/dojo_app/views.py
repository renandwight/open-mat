from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Technique
from .serializers import TechniqueSerializer, TechniqueListSerializer


class TechniqueList(APIView):
    def get(self, request):
        techniques = Technique.objects.all()
        
        category = request.query_params.get('category')
        if category:
            techniques = techniques.filter(category=category)
        
        difficulty = request.query_params.get('difficulty')
        if difficulty:
            techniques = techniques.filter(difficulty=difficulty)
        
        position = request.query_params.get('position')
        if position:
            techniques = techniques.filter(position=position)
        
        search = request.query_params.get('search')
        if search:
            techniques = techniques.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )
        
        serializer = TechniqueListSerializer(techniques, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TechniqueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TechniqueDetail(APIView):
    def get(self, request, pk):
        technique = get_object_or_404(Technique, pk=pk)
        serializer = TechniqueSerializer(technique)
        return Response(serializer.data)
    
    def put(self, request, pk):
        technique = get_object_or_404(Technique, pk=pk)
        serializer = TechniqueSerializer(technique, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        technique = get_object_or_404(Technique, pk=pk)
        technique.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)