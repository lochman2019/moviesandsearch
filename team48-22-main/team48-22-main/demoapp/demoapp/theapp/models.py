from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager


class CustomUserManager(UserManager):
    pass
    # def create_user(self, email: str, password: str):
    #     return super().create_user(email, email, password)

    # def create_superuser(self, email: str, password: str):
    #     return super().create_superuser(email, email, password)


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    object = CustomUserManager()


class MovieTag(models.Model):

    class Meta:
        unique_together = ('user', 'tag_name')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag_name = models.CharField(max_length=100)


class LocationTag(models.Model):

    class Meta:
        unique_together = ('user', 'tag_name')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag_name = models.CharField(max_length=100)


class UserFriend(models.Model):

    class Meta:
        unique_together = ('user', 'tag_name')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag_name = models.CharField(max_length=100)


class PostMovie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='movies', blank=True, null=True)
    title = models.CharField(max_length=100)
    introduction = models.TextField(max_length=1000)
    tag_list = models.ManyToManyField(MovieTag)
    location_tag_list = models.ManyToManyField(LocationTag)
    friend_list = models.ManyToManyField(UserFriend)


class UserLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(PostMovie, on_delete=models.CASCADE)


class UserFavorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=True)
    post = models.ForeignKey(PostMovie, on_delete=models.CASCADE)
