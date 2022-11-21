import { Query, Resolver } from '@nestjs/graphql'
import { User } from './models/user.model'
import { UserService } from './user.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  /*
    Returns currently authenticated user
   */
  @Query((returns) => User)
  async user(@CurrentUser() user: User): Promise<User> {
    return this.userService.findByPk(user.uid)
  }
}
