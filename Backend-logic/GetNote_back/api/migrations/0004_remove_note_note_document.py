# Generated by Django 4.2.5 on 2023-09-11 11:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_note_note_document'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='note_document',
        ),
    ]