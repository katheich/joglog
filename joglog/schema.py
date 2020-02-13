import graphene

import users.schema


class Mutation(users.schema.Mutation, graphene.ObjectType,):
    pass

class Query(users.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
