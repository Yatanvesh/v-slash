import {Args, Int, Query, Resolver} from "@nestjs/graphql";
import {User} from "./models/user.model";
import {UserService} from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {
  }

  @Query(returns => User)
  async user(@Args('uid', {type: () => String}) uid: string): Promise<User> {
    return this.userService.findOne(uid)
  }
}
