from django.contrib import admin
from .models import RunPlan, RunLog, Race

# Register your models here.
admin.site.register(RunPlan)
admin.site.register(RunLog)
admin.site.register(Race)
