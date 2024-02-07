from .import views
from django.urls import path

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>/', views.getProduct, name='product'),
    path('save-shipping/', views.saveShippingAddress, name='save-shipping'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('users/', views.getUserProfile, name='users-profiles'),

]