from django.shortcuts import render
from .models import Movie, ReviewPhoto, Review


def search(request):
    query = request.GET.get('q')
    if query:
        movies = Movie.objects.filter(title__icontains=query)
        if movies.exists():
            movie = movies.first()
            reviews = Review.objects.filter(movie=movie)
            review_photos = {}
            for review in reviews:
                review_photos[review.id] = ReviewPhoto.objects.filter(review=review)
            return render(request, 'search.html', {'movie': movie, 'reviews': reviews, 'review_photos': review_photos})
    return render(request, 'search.html')
