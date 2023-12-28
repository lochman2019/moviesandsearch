from django.urls import path, include
from rest_framework.routers import DefaultRouter

from theapp.views import (
    LoginView,
    SignupView,
    UserViewSet,
    MovieTagViewSet,
    LocationTagViewSet,
    UserFriendViewSet,
    PostMovieViewSet
    
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'movie_tags', MovieTagViewSet, basename='movie_tags')
router.register(r'location_tags', LocationTagViewSet, basename='location_tags')
router.register(r'friends', UserFriendViewSet, basename='friends')
router.register(r'postmovies', PostMovieViewSet, basename='postmovies')


urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('', include(router.urls)),
]
