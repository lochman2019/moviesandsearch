# Generated by Django 4.2 on 2023-04-28 03:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0002_alter_movie_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='movie',
            options={'ordering': ('title',), 'verbose_name_plural': 'movies'},
        ),
    ]