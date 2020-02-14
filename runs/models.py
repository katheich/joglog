from django.db import models

# Create your models here.
class RunBase(models.Model):

    RUNTYPES = (
        ('EASY', 'Easy run'),
        ('ENDURANCE', 'Endurance run'),
        ('TEMPO', 'Tempo run'),
        ('INTERVALS', 'Interval run'),
        ('UNCATEGORISED', 'Uncagetorised run'),
    )

    UNITS = (
        ('KM', 'Kilometres'),
        ('MI', 'Miles'),
    )

    runtype = models.CharField(max_length=13, choices=RUNTYPES, default='UNCATEGORISED')
    date = models.DateField(auto_now=False, auto_now_add=False)
    units = models.CharField(max_length=2, choices=UNITS, default='KM')

    distance = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    pace = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    intervals = models.IntegerField(null=True)
    interval_distance = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    recovery_distance = models.DecimalField(max_digits=5, decimal_places=2, null=True)

    class Meta:
        abstract = True


class RunPlan(RunBase):
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'Plan: {self.runtype} - {self.date}, {self.distance}'

