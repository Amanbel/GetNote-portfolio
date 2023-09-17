from rest_framework import serializers
from .models import User, Note, Files, ImageFile


class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    class Meta():
        model = Note
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageFile
        fields = '__all__'
