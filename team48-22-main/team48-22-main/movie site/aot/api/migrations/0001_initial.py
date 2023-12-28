import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone
from  api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(app, schema_editor):
        user = CustomUser(name='admin',
        email='admin@admin.com',
        is_staff=True,
        is_superuser=True,
        phone=978686,
        gender='male')
        user.set_password("admin")
        user.save()

    dependencies= [

    ]
    operations=[
        migrations.RunPython(seed_data),
    ]