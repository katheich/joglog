import graphene
import graphql_jwt

import users.schema
import runs.schema


class Mutation(users.schema.Mutation, runs.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(runs.schema.Query, users.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
