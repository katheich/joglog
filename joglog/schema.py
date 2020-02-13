import graphene

import users.schema
import runs.schema


class Mutation(users.schema.Mutation, graphene.ObjectType,):
    pass

class Query(runs.schema.Query, users.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
