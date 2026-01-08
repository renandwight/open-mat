"""
URL configuration for openmat_prok project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/dojo/', include('dojo_app.urls')),
    path('api/gyms/', include("gym_app.urls")),
    path('api/auth/', include('user_app.urls')),
    path("api/reviews/", include("review_app.urls")), #Alex got rid of a duplicate url path but if anything breaks tis was I
    path('api/users/favorites/', include('favorite_app.urls')),
    path('api/events/', include('event_app.urls')),
]
