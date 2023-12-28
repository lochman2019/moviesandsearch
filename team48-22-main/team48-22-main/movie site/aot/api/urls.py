from django.urls import path,include

urlpatterns = [
   path('product/', include('api.product.urls')),
    path('user/', include('api.user.urls')),
    path('category/', include('api.category.urls')),
    
]