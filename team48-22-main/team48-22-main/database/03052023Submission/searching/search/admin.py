from django.contrib import admin

from .models import Movie
from .models import MoviePhoto

# Register your models here.

class ShowMovie(admin.ModelAdmin):
    list_display= ("title", "description",)

admin.site.register(Movie, ShowMovie)

class ShowMovieImages(admin.ModelAdmin):
    list_display = ("movie", "image",)

admin.site.register(MoviePhoto ,ShowMovieImages)