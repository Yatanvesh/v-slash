import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

export const GRAPHQL_CONFIG = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  // The code first approach allows the schema file to be generated automatically
  // It contains all the queries and mutations defined in resolvers
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
})
