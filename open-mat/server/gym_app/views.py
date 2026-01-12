from django.shortcuts import render
from .models import Gym
from .distance import address_to_coords, zip_to_coords, haversine
from django.shortcuts import get_object_or_404
from .serializers import GymSerializer
from django.utils import timezone
from django.db.models import Q
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, SAFE_METHODS


# Create your views here.
class All_Gyms(APIView):
    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        if self.request.method == SAFE_METHODS:
            return [IsAuthenticated()]
        return [AllowAny()]
    def get(self, request):
        gyms=GymSerializer(Gym.objects.order_by('name'), many=True)
        return Response(gyms.data)
    def post(self, request):
        #do something to grab the latitude, longitude of the gym.
        data=request.data
        data['latitude'], data['longitude']=address_to_coords(data)
           
        new_gym=GymSerializer(data=data)
        
        if new_gym.is_valid():
            new_gym.save(created_by=request.user)
            return Response(new_gym.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
        #should probably add a validation check
        
#request passes params{zip=?, radius=?}
#api request looks like http://127.0.0.1:8000/api/gyms/nearby/?zip=10028&radius=10
class Nearby_Gyms(APIView):
    def get(self, request):
        data = request.query_params  
        radius = float(data.get("radius", 10))
        zip_code = data.get("zip")

        if not zip_code:
            return Response(
                {"error": "zip is required"},
                status=400
            )

        user_lat, user_lon = zip_to_coords(zip_code)

        nearby_gyms = []

        for gym in Gym.objects.exclude(latitude__isnull=True, longitude__isnull=True):
            dist = haversine(
                user_lat,
                user_lon,
                gym.latitude,
                gym.longitude
            )

            if dist <= radius:
                nearby_gyms.append((dist, gym))

        # sort by distance
        nearby_gyms.sort(key=lambda x: x[0])

        gyms = [gym for dist, gym in nearby_gyms]
        distances = {gym.id: dist for dist, gym in nearby_gyms}
        serializer = GymSerializer(
            gyms,
            many=True,
            context={"distances": distances}
        )

        return Response(serializer.data)

class My_Gyms(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        gyms=Gym.objects.all()
        if request.user:
            gyms=gyms.filter(created_by=request.user.id)
        else:
            gyms=[]
        serializer = GymSerializer(gyms, many=True)
        return Response(serializer.data)
    
#api request looks like http://127.0.0.1:8000/api/gyms/search/?city=Bronx
class Filtered_Gyms(APIView):
    def get(self, request):
        gyms = Gym.objects.all()

        q = request.query_params.get("q")

        if q:
            tokens = q.split()

            for token in tokens:
                gyms = gyms.filter(
                    Q(name__icontains=token) |
                    Q(city__icontains=token)
                )

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
        return Response(GymSerializer(gym).data)
    
    def put(self, request, id):
        gym = self.get_a_gym(id)
        
        data = request.data
        if data['zip']!=gym.zip:
            data['latitude'], data['longitude']=address_to_coords(data)
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
        
        
    

