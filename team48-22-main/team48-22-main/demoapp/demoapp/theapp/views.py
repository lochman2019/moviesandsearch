from theapp.serializers import (
    UserSerializer, MovieTagSerializer, LocationTagSerializer,
    PostMovieSerializer, UserFavoriteSerializer, UserFriendSerializer
)
from theapp.models import (
    User, MovieTag, LocationTag,
    PostMovie, UserFavorite, UserFriend
)
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate
from django.http import HttpRequest


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['username', 'email']
    filterset_fields = ['username', 'email']

    def perform_create(self, serializer):
        return Response({'error': 'You cannot create a user'},
                        status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs, partial=True)

    def perform_update(self, serializer):
        return super().perform_update(serializer)

    def perform_destroy(self, instance):
        return Response({'error': 'You cannot delete a user'},
                        status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request: HttpRequest):
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            token = Token.objects.get_or_create(user=user.instance)
            return Response({'token': token[0].key}, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request: HttpRequest):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error': 'Invalid Credentials'},
                            status=status.HTTP_400_BAD_REQUEST)
        token = Token.objects.get_or_create(user=user)
        return Response({'token': token[0].key}, status=status.HTTP_200_OK)


class MovieTagViewSet(viewsets.ModelViewSet):
    queryset = MovieTag.objects.all()
    serializer_class = MovieTagSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.AllowAny]
    filterset_fields = ['tag_name']

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LocationTagViewSet(viewsets.ModelViewSet):
    queryset = LocationTag.objects.all()
    serializer_class = LocationTagSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserFavoriteViewSet(viewsets.ModelViewSet):
    queryset = UserFavorite.objects.all()
    serializer_class = UserFavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class PostMovieViewSet(viewsets.ModelViewSet):
    queryset = PostMovie.objects.all()
    serializer_class = PostMovieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserFriendViewSet(viewsets.ModelViewSet):
    queryset = UserFriend.objects.all()
    serializer_class = UserFriendSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostMovieViewSet(viewsets.ModelViewSet):
    queryset = PostMovie.objects.all()
    serializer_class = PostMovieSerializer
    permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
