# Generated by Django 3.0.3 on 2020-02-14 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0005_runlog'),
    ]

    operations = [
        migrations.CreateModel(
            name='Race',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('racetype', models.CharField(choices=[('5', '5K'), ('10', '10K'), ('HM', 'Half-marathon'), ('M', 'Marathon'), ('M+', 'Ultra marathon')], default='10', max_length=2)),
                ('date', models.DateField()),
                ('units', models.CharField(choices=[('KM', 'Kilometres'), ('MI', 'Miles')], default='KM', max_length=2)),
                ('distance', models.IntegerField()),
                ('name', models.CharField(max_length=300)),
            ],
        ),
    ]
