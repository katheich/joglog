# Generated by Django 3.0.3 on 2020-02-14 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0003_remove_easyrunplan_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='RunPlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('runtype', models.CharField(choices=[('EASY', 'Easy run'), ('ENDURANCE', 'Endurance run'), ('TEMPO', 'Tempo run'), ('INTERVALS', 'Interval run'), ('UNCATEGORISED', 'Uncagetorised run')], default='UNCATEGORISED', max_length=13)),
                ('date', models.DateField()),
                ('units', models.CharField(choices=[('KM', 'Kilometres'), ('MI', 'Miles')], default='KM', max_length=2)),
                ('distance', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('pace', models.DecimalField(decimal_places=2, max_digits=4, null=True)),
                ('intervals', models.IntegerField(null=True)),
                ('interval_distance', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('recovery_distance', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('completed', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.DeleteModel(
            name='EasyRunPlan',
        ),
    ]
