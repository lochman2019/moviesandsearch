from django.http import JsonResponse
from search.models import Location, Movie, MoviePhoto
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import TravelMarker

def map(request):
    return render(request, 'map.html')
def foot(request):
    return  render(request,"footprint.html")

def get_movies(request):
    # 获取所有电影和相关的拍摄地点
    movies = Movie.objects.all()
    movie_photos = MoviePhoto.objects.all()
    locations = Location.objects.all()
    print(movies)
    print(movie_photos)
    print(locations)

    # 将数据序列化为 JSON 格式
    data = {
        'movies': [
            {
                'id': movie.id,
                'title': movie.title,
                'description': movie.description,
                'photo_urls': [photo.image.url for photo in movie_photos.filter(movie=movie)],
                'location_ids': [location.id for location in movie.locations.all()]
            }
            for movie in movies
        ],
        'locations': [
            {
                'id': location.id,
                'name': location.name,
                'coordinates': location.coordinates,
            }
            for location in locations
        ],
    }
    print(data)
    # 将数据作为 JSON 响应发送回前端
    return JsonResponse(data)


@csrf_exempt
def create_marker(request):
    if request.method == 'POST':
        description = request.POST.get('description')
        latitude = float(request.POST.get('latitude'))
        longitude = float(request.POST.get('longitude'))

        marker = TravelMarker(user=request.user, description=description, latitude=latitude, longitude=longitude)
        marker.save()

        return JsonResponse({'status': 'success', 'message': 'Marker saved.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})