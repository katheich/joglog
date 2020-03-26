import graphene
from graphene_django import DjangoObjectType

from .models import Plan, Run, Race


class PlanType(DjangoObjectType):
    class Meta:
        model = Plan
        filter_fields = ['user']
        interfaces = (graphene.relay.Node, )

class RunType(DjangoObjectType):
    class Meta:
        model = Run
        filter_fields = ['user']
        interfaces = (graphene.relay.Node, )

class RaceType(DjangoObjectType):
    class Meta:
        model = Race
        filter_fields = ['user']
        interfaces = (graphene.relay.Node, )
