from django.db import models
# from .models import User


class User(models.Model):
    username = models.CharField(max_length=20)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=12)
    status = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.username


class Note(models.Model):
    title = models.CharField(max_length=255)
    subject = models.CharField(max_length=30)
    type = models.CharField(max_length=20)
    written_for = models.CharField(max_length=200)
    written_from = models.CharField(max_length=100)
    written_date = models.DateField()
    posted_date = models.DateField()
    monetization_status = models.CharField(max_length=10)
    description = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    note_page = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Files(models.Model):
    note_fk = models.ForeignKey(Note, on_delete=models.CASCADE)
    note_file = models.FileField(upload_to='store/note_files/')

    def __str__(self):
        return self.note_file


class ImageFile(models.Model):
    user_fk = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_img = models.ImageField(
        upload_to='user/picture/', default='user/picture/default-pic.webp')
