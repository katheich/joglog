import graphene

from users.schema import UserType

from .models import Plan
from .types import PlanType


class Query(graphene.ObjectType):
    plans = graphene.List(PlanType)

    def resolve_plans(self, info):
        return Plan.objects.all()



class CreatePlan(graphene.Mutation):
    id = graphene.Int()
    runtype = graphene.String()
    date = graphene.Date()

    description = graphene.String()

    completed = graphene.Boolean()
    skipped = graphene.Boolean()

    user = graphene.Field(UserType)

    class Arguments:
        runtype = graphene.String()
        date = graphene.Date()

        description = graphene.String()

        completed = graphene.Boolean()
        skipped = graphene.Boolean()

    def mutate(self, info, runtype, date, description, completed, skipped):
        user = info.context.user
        plan = Plan(runtype=runtype, date=date, description=description, completed=completed, skipped=skipped, user=user)
        plan.save()

        return CreatePlan(
            id=plan.id,
            runtype=plan.runtype,
            date=plan.date,
            description=plan.description,
            completed=plan.completed,
            skipped=plan.skipped,
            user=plan.user,
        )

class Mutation(graphene.ObjectType):
    create_plan = CreatePlan.Field()
