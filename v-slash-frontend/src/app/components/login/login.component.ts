import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../core/services/auth.service'
import { LoginResponse } from '../../core/core.types'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  register = {
    email: '',
    password: '',
    name: '',
  }
  login = {
    email: 'oggybuddy1@gmail.com',
    password: '123',
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleLogin() {
    this.authService.login(this.login).subscribe((res: LoginResponse) => {
      const { accessToken } = res
      this.authService.saveToken(accessToken)
      this.router.navigate([''])
    })
  }

  handleRegister() {
    this.authService.register(this.register).subscribe((res: LoginResponse) => {
      this.login = {
        ...this.register,
      }
      this.handleLogin()
    })
  }
}
