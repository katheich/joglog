import graphene
from graphql_jwt.decorators import login_required
from graphene_django.filter import DjangoFilterConnectionField

from users.schema import UserType

from .models import Plan, Run, Race
from .types import PlanType, RunType, RaceType


class Query(graphene.ObjectType):
    plans = graphene.List(PlanType)
    runs = graphene.List(RunType)
    races = graphene.List(RaceType)
    my_plans = DjangoFilterConnectionField(PlanType)
    my_runs = DjangoFilterConnectionField(RunType)
    my_races = DjangoFilterConnectionField(RaceType)



    @login_required
    def resolve_plans(self, info):
        return Plan.objects.all()

    @login_required
    def resolve_runs(self, info):
        return Run.objects.all()

    @login_required
    def resolve_races(self, info):
        return Race.objects.all()

    @login_required
    def resolve_my_plans(self, info):
        return Plan.objects.filter(user=info.context.user)

    @login_required
    def resolve_my_runs(self, info):
        return Run.objects.filter(user=info.context.user)

    @login_required
    def resolve_my_races(self, info):
        return Race.objects.filter(user=info.context.user)



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

class CreateRace(graphene.Mutation):
    id = graphene.Int()
    date = graphene.Date()
    name = graphene.String()
    user = graphene.Field(UserType)

    class Arguments:
        date = graphene.Date()
        name = graphene.String()

    @login_required
    def mutate(self, info, date, name):
        user = info.context.user
        race = Race(date=date, name=name, user=user)
        race.save()

        return CreateRace(
            id=race.id,
            name=race.name,
            date=race.date,
            user=race.user
        )


class Mutation(graphene.ObjectType):
    create_plan = CreatePlan.Field()
    create_run = CreateRun.Field()
    create_race = CreateRace.Field()
