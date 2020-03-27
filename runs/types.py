import graphene
from graphene_django import DjangoObjectType

from .models import Plan, Run, Race

class CustomNode(graphene.Node):
    class Meta:
        name = 'Node'

    @staticmethod
    def to_global_id(type, id):
        return id

class PlanType(DjangoObjectType):
    class Meta:
        model = Plan
        filter_fields = ['user']
        interfaces = (CustomNode, )

class RunType(DjangoObjectType):
    class Meta:
        model = Run
        filter_fields = ['user']
        interfaces = (CustomNode, )

class RaceType(DjangoObjectType):
    class Meta:
        model = Race
        filter_fields = ['user']
        interfaces = (CustomNode, )
