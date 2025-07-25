from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, RegisterView 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

    
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')  # ✅ add basename here

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
