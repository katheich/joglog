import graphene
from graphql_jwt.decorators import login_required


from users.schema import UserType

from .models import Plan, Run, Race
from .types import PlanType, RunType, RaceType


class Query(graphene.ObjectType):
    plans = graphene.List(PlanType)
    runs = graphene.List(RunType)
    
    def resolve_plans(self, info):
        return Plan.objects.all()

    def resolve_runs(self, info):
        return Run.objects.all()



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

    @login_required
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


class CreateRun(graphene.Mutation):
    id = graphene.Int()
    runtype = graphene.String()
    date = graphene.Date()
    units = graphene.String()
    distance = graphene.Decimal()
    pace = graphene.Decimal()
    duration = graphene.Decimal()
    avg_HR = graphene.Int()
    notes = graphene.String()
    user = graphene.Field(UserType)

    class Arguments:
        runtype = graphene.String()
        date = graphene.Date()
        units = graphene.String()
        distance = graphene.Decimal()
        duration = graphene.Decimal()
        avg_HR = graphene.Int()
        notes = graphene.String()

    @login_required
    def mutate(self, info, runtype, date, units, distance, duration, avg_HR, notes):
        user = info.context.user
        pace = duration / distance
        run = Run(runtype=runtype, date=date, units=units, distance=distance, pace=pace, duration=duration, avg_HR=avg_HR, notes=notes, user=user)
        run.save()

        return CreateRun(
            id=run.id,
            runtype=run.runtype,
            date=run.date,
            units=run.units, 
            distance=run.distance, 
            pace=run.pace, 
            duration=run.duration, 
            avg_HR=run.avg_HR, 
            notes=run.notes, 
            user=run.user
        )


class Mutation(graphene.ObjectType):
    create_plan = CreatePlan.Field()
    create_run = CreateRun.Field()
