import graphene
from graphene_django import DjangoObjectType

from .models import Plan


class PlanType(DjangoObjectType):
    class Meta:
        model = Plan


class Query(graphene.ObjectType):
    plans = graphene.List(PlanType)

    def resolve_plans(self, info, **kwargs):
        return Plan.objects.all()


class CreatePlan(graphene.Mutation):
    id = graphene.Int()
    runtype = graphene.String()
    date = graphene.Date()

    description = graphene.String()

    completed = graphene.Boolean()
    skipped = graphene.Boolean()

    class Arguments:
        runtype = graphene.String()
        date = graphene.Date()

        description = graphene.String()

        completed = graphene.Boolean()
        skipped = graphene.Boolean()

    def mutate(self, info, runtype, date, description, completed, skipped):
        plan = Plan(runtype=runtype, date=date, description=description, completed=completed, skipped=skipped)
        plan.save()

        return CreatePlan(
            id=plan.id,
            runtype=plan.runtype,
            date=plan.date,
            description=plan.description,
            completed=plan.completed,
            skipped=plan.skipped,
        )

class Mutation(graphene.ObjectType):
    create_plan = CreatePlan.Field()
