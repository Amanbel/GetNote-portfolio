# Generated by Django 4.2.5 on 2023-09-11 14:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_files'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='posted_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
