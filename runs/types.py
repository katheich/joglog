import graphene
from graphene_django import DjangoObjectType

from .models import Plan


class PlanType(DjangoObjectType):
    class Meta:
        model = Plan
