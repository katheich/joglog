import graphene
from graphene_django import DjangoObjectType

from .models import EasyRunPlan


class EasyRunPlanType(DjangoObjectType):
    class Meta:
        model = EasyRunPlan


class Query(graphene.ObjectType):
    easy_runs_planned = graphene.List(EasyRunPlanType)

    def resolve_easy_runs_planned(self, info, **kwargs):
        return EasyRunPlan.objects.all()
