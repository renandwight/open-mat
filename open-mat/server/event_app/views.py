from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Event
from .serializers import EventReadSerializer, EventWriteSerializer

from user_app.views import UserPermission

class EventListCreateView(APIView):
    authentication_classes = UserPermission.authentication_classes

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [permission() for permission in UserPermission.permission_classes]

    def get(self, request):
        events = Event.objects.select_related("gym", "user").order_by("-event_date")
        serializer = EventReadSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        event = serializer.save(user=request.user)

        return Response(EventReadSerializer(event).data, status=status.HTTP_201_CREATED)


class EventDetailView(APIView):
    authentication_classes = UserPermission.authentication_classes

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [permission() for permission in UserPermission.permission_classes]

    def get_object(self, id):
        return get_object_or_404(Event.objects.select_related("gym", "user"), id=id)

    def get(self, request, id):
        event = self.get_object(id)
        return Response(EventReadSerializer(event).data)

    def put(self, request, id):
        event = self.get_object(id)
        serializer = EventWriteSerializer(event, data=request.data)
        serializer.is_valid(raise_exception=True)
        updated = serializer.save(user=request.user)
        return Response(EventReadSerializer(updated).data)

    def delete(self, request, id):
        event = self.get_object(id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

