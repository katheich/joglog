import graphene
from graphene_django import DjangoObjectType

from .models import Plan, Run, Race


class PlanType(DjangoObjectType):
    class Meta:
        model = Plan

class RunType(DjangoObjectType):
    class Meta:
        model = Run

class RaceType(DjangoObjectType):
    class Meta:
        model = Race
