from django.db import models

# Create your models here.
class EasyRunBase(models.Model):

    UNITS = (
        ('KM', 'Kilometres'),
        ('MI', 'Miles'),
    )

    date = models.DateField(auto_now=False, auto_now_add=False)
    distance = models.DecimalField(max_digits=5, decimal_places=2)
    time = models.DecimalField(max_digits=5, decimal_places=2)
    units = models.CharField(max_length=2, choices=UNITS, default='KM')

    class Meta:
        abstract = True


class EasyRunPlan(EasyRunBase):
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'Planned Easy - {self.date}, {self.distance}'
