import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/entities/user.entity";

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && password === '123') {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {email: user.email, sub: user.uid}
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
