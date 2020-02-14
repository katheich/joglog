import graphene
from graphene_django import DjangoObjectType

from .models import RunPlan


class RunPlanType(DjangoObjectType):
    class Meta:
        model = RunPlan


class Query(graphene.ObjectType):
    runs_planned = graphene.List(RunPlanType)

    def resolve_runs_planned(self, info, **kwargs):
        return RunPlan.objects.all()
