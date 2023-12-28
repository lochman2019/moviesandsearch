from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('map/', views.map, name='map'),
    path('footprint/', views.foot, name='footprint'),
    path('get_movie_data/', views.get_movies, name='get_movies'),
    path('create_marker/', views.create_marker, name='create_marker'),


]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)