# Generated by Django 3.1.7 on 2021-05-29 10:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testhistory',
            name='timestamp',
            field=models.DateTimeField(null=True, verbose_name=datetime.datetime(2021, 5, 29, 10, 35, 32, 47641)),
        ),
    ]
