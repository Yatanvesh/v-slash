import { Component, OnInit } from '@angular/core'
import { Shortcut, ShortcutType } from '../../core/core.types'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Apollo } from 'apollo-angular'
import { CREATE_SHORTCUT } from '../../core/gqlQueries'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-shortcut',
  templateUrl: './create-shortcut.component.html',
  styleUrls: ['./create-shortcut.component.scss'],
})
export class CreateShortcutComponent implements OnInit {
  shortcut: Shortcut = {
    shortLink: '',
    fullUrl: '',
    description: '',
    type: ShortcutType.PRIVATE,
  }
  ShortcutType = ShortcutType

  constructor(
    private _snackBar: MatSnackBar,
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  createShortcut() {
    if (!this.shortcut.shortLink || !this.shortcut.fullUrl) {
      this._snackBar.open('Please enter short link and full url', 'Ok', {
        duration: 5000,
      })
      return
    }

    this.apollo
      .mutate({
        mutation: CREATE_SHORTCUT,
        variables: {
          ...this.shortcut,
        },
        context: this.authService.getGraphQlContext(),
      })
      .subscribe(
        (res) => {
          this._snackBar.open('Shortcut created', 'Ok', {
            duration: 5000,
          })
          this.router.navigate(['list'])
        },
        (err) => {
          this._snackBar.open(err.toString(), 'Ok', {
            duration: 5000,
          })
        },
      )
  }
}
