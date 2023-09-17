from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Note, Files, ImageFile
from rest_framework import viewsets
from .serializers import UserSerializer, NoteSerializer, FileSerializer, ImageSerializer


@api_view(['GET'])
def apiOverview(request):
    api_overview = {
        'users list': 'users-list/',
        'notes-list': 'notes-list/'
    }
    return Response(api_overview)


@api_view(['GET'])
def usersList(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def notesList(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def userSignUp(request):
    userdata = UserSerializer(data=request.data)

    if userdata.is_valid():
        email = userdata.validated_data.get("email")

        if User.objects.filter(email=email).exists():
            return Response({"condition": 2})
        user = userdata.save()
        return Response({"condition": 1, "user_id": user.id})
    return Response({"condition": 0})


@api_view(['POST'])
def noteCreation(request):
    notedata = NoteSerializer(data=request.data)

    if notedata.is_valid():
        saved_note = notedata.save()
        return Response({"condition": 1, "note_id": saved_note.id})
    return Response({"condition": 0})


@api_view(['GET'])
def userLogin(request, email, password):
    user = User.objects.filter(email=email, password=password)

    if user.exists():
        serializer = UserSerializer(user.first(), many=False)
        return Response({"condition": 1, "user": serializer.data})
    return Response({"condition": 0})


@api_view(['DELETE'])
def noteDelete(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()

    return Response("successful")


@api_view(['GET'])
def userData(request, pk):
    user = User.objects.get(id=pk)
    full_name = user.first_name + " " + user.last_name
    user_status = user.status

    return Response({"name": full_name, "status": user_status})


@api_view(['DELETE'])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response("successful")


@api_view(['POST'])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"condition": 1, "user": serializer.data})
    return Response({"condition": 0})


@api_view(['POST'])
def updateNoteFile(request, pk):
    file = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=file, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"condition": 1})
    return Response({"condition": 0})


@api_view(['GET'])
def searchNote(request, type, subject):
    notes = Note.objects.all()
    searched = []

    for note in notes:
        print(note.type)
        print(type)
        if type == note.type and (subject.lower() in note.subject.lower()):
            searched.append(NoteSerializer(note, many=False).data)
    return Response({"condition": 1, "searched": searched})


class FileViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FileSerializer

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        instance = Files.objects.get(note_fk=params['pk'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        params = kwargs
        up_file = Files.objects.get(note_fk=params['pk'])
        serializer = FileSerializer(instance=up_file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"condition": 1})
        return Response({"condition": 0})


class ImageViewSet(viewsets.ModelViewSet):
    queryset = ImageFile.objects.all()
    serializer_class = ImageSerializer

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        instance = ImageFile.objects.get(user_fk=params['pk'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        params = kwargs
        up_img = ImageFile.objects.get(user_fk=params['pk'])
        serializer = ImageSerializer(instance=up_img, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"condition": 1})
        return Response({"condition": 0})
