import { IsDefined, IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @IsDefined()
  @IsString()
  name: string

  @IsDefined()
  @IsEmail()
  email: string

  @IsDefined()
  @IsString()
  password: string
}
