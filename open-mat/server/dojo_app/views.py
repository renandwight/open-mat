from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Technique
from .serializers import TechniqueSerializer, TechniqueListSerializer


class TechniqueList(APIView):
    """
    List all techniques or create a new technique.
    
    GET /api/dojo/techniques/
    POST /api/dojo/techniques/
    """
    
    def get(self, request):
        """List all techniques with optional filtering."""
        techniques = Technique.objects.all()
        
        # Manual filtering
        category = request.query_params.get('category')
        if category:
            techniques = techniques.filter(category=category)
        
        difficulty = request.query_params.get('difficulty')
        if difficulty:
            techniques = techniques.filter(difficulty=difficulty)
        
        position = request.query_params.get('position')
        if position:
            techniques = techniques.filter(position=position)
        
        # Manual search
        search = request.query_params.get('search')
        if search:
            techniques = techniques.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )
        
        # Use lighter serializer for list view
        serializer = TechniqueListSerializer(techniques, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        """Create a new technique (admin only)."""
        serializer = TechniqueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TechniqueDetail(APIView):
    """
    Retrieve, update or delete a technique.
    
    GET /api/dojo/techniques/:id/
    PUT /api/dojo/techniques/:id/
    DELETE /api/dojo/techniques/:id/
    """
    
    def get(self, request, pk):
        """Retrieve a single technique."""
        technique = get_object_or_404(Technique, pk=pk)
        serializer = TechniqueSerializer(technique)
        return Response(serializer.data)
    
    def put(self, request, pk):
        """Update a technique (admin only)."""
        technique = get_object_or_404(Technique, pk=pk)
        serializer = TechniqueSerializer(technique, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        """Delete a technique (admin only)."""
        technique = get_object_or_404(Technique, pk=pk)
        technique.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
