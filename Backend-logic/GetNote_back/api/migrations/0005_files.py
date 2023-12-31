# Generated by Django 4.2.5 on 2023-09-11 11:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_note_note_document'),
    ]

    operations = [
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note_file', models.FileField(upload_to='store/note_files/')),
                ('note_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.note')),
            ],
        ),
    ]
