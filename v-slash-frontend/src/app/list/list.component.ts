import { Component, OnInit } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { AuthService } from '../core/services/auth.service'
import { Shortcut, ShortcutType } from '../core/core.types'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  shortcuts: Shortcut[] = []
  loading = true
  error: any

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit(): void {
    this.getShortcuts()
  }

  getShortcuts() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            userShortcuts {
              uid
              shortLink
              fullUrl
              description
              type
              createdAt
              tags {
                tag
              }
            }
          }
        `,
        context: this.authService.getGraphQlContext(),
      })
      .valueChanges.subscribe((result: any) => {
        this.shortcuts = result.data?.userShortcuts
        this.loading = result.loading
        this.error = result.error
      })
  }

  getIcon(type: ShortcutType) {
    if (type === ShortcutType.ORGANISATION) {
      return 'people'
    } else {
      return 'account_circle'
    }
  }
}
