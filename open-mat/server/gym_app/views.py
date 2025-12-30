from django.shortcuts import render
from .models import Gym
from django.shortcuts import get_object_or_404
from .serializers import GymSerializer
from django.utils import timezone
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class All_Gyms(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        gyms=GymSerializer(Gym.objects.order_by('name'), many=True)
        return Response(gyms.data)
    def post(self, request):
        #do something to grab the latitude, longitude of the gym.
        new_gym=GymSerializer(data=request.data)
        if new_gym.is_valid():
            new_gym.save()
            return Response(new_gym.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
        #should probably add a validation check
        

class Nearby_Gyms(APIView):
    def get(self, request):
        #must calculate distance from user 
        #request should pass address
        data = request.data
        
        gyms=GymSerializer(Gym.objects.order_by('name'), many=True)
        return Response(gyms.data)
    
class Filtered_Gyms(APIView):
    def get(self, request):
        #request should probably hold some kind of filter criteria
        #front end usage: axios.get("/gyms/search", {params: { q: "fitness" }})
        
        gyms=Gym.objects.all()
       

        city = request.query_params.get("city")
        name = request.query_params.get("name")

        if city:
            gyms = gyms.filter(city__iexact=city)

        if name:
            gyms = gyms.filter(name__icontains=name)

        serializer = GymSerializer(gyms, many=True)
        return Response(serializer.data)
       
class A_Gym(APIView):
    def get_a_gym(self, id):
        gym = None
        if type(id)==int:
            gym = get_object_or_404(Gym, id=id)
        else:
            gym = get_object_or_404(Gym, name=id.title())
        return gym
    def get(self, request,id):
        gym=self.get_a_gym(id)
        return Response(GymSerializer(gym).data,status=HTTP_204_NO_CONTENT)
    
    def put(self, request, id):
        gym = self.get_a_gym(id)
        data = request.data
        data['updated_at']=timezone.now
        ser_gym = GymSerializer(gym, data=request.data, partial = True)
        #validation check needed here
        if ser_gym.is_valid():
            ser_gym.save()
            return Response(status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id):
        # get a gym from our database
        gym = self.get_a_gym(id)
        # delete instance and database entry
        gym.delete()
        # return the name of the pokemon deleted
        return Response(status=HTTP_204_NO_CONTENT)
        
        
    

