# Generated by Django 3.0.3 on 2020-03-22 13:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0009_auto_20200322_1317'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='run',
            name='time',
        ),
    ]
