from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('files', views.FileViewSet, basename='files')
router_for_img = DefaultRouter()
router_for_img.register('images', views.ImageViewSet, basename='images')

urlpatterns = [
    path('', views.apiOverview, name='api_overview'),
    path('users-list/', views.usersList, name='users-list'),
    path('notes-list/', views.notesList, name='notes-list'),
    path('create-user/', views.userSignUp, name='create-user'),
    path('user-login/<str:email>/<str:password>/',
         views.userLogin, name='user-login'),
    path('create-note/', views.noteCreation, name='create-note'),
    path('file-upload/', include(router.urls)),
    path('image-upload/', include(router_for_img.urls)),
    path('note-delete/<int:pk>/', views.noteDelete, name='note-delete'),
    path('user-data/<int:pk>/', views.userData, name="user-data"),
    path('user-delete/<int:pk>/', views.deleteUser, name="user-delete"),
    path('user-update/<int:pk>/', views.updateUser, name='user-update'),
    path('note-update/<int:pk>/', views.updateNoteFile, name='note-update'),
    path('search-note/<str:type>/<str:subject>/',
         views.searchNote, name='search-note')
]
