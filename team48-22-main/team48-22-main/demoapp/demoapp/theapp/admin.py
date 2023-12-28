from django.contrib import admin

from theapp.models import User, MovieTag, LocationTag, UserFriend, PostMovie, UserLike
# Register your models here.
# Register postmoives

@admin.register(PostMovie)
class PostMovieAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'introduction')

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'avatar')