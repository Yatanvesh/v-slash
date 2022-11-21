import { Component, OnDestroy, OnInit } from '@angular/core'
import { Apollo, gql, QueryRef } from 'apollo-angular'
import { AuthService } from '../../core/services/auth.service'
import { Shortcut, ShortcutType } from '../../core/core.types'
import { Router } from '@angular/router'
import { LIST_SHORTCUTS } from '../../core/gqlQueries'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  shortcuts: Shortcut[] = []
  loading = true
  error: any
  querySubscription: Subscription | undefined
  listQuery: QueryRef<any> | undefined

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getShortcuts()
    this.refresh()
  }

  getShortcuts() {
    this.listQuery = this.apollo.watchQuery<any>({
      query: LIST_SHORTCUTS,
      context: this.authService.getGraphQlContext(),
    })
    this.querySubscription = this.listQuery.valueChanges.subscribe(
      (result: any) => {
        this.shortcuts = result.data?.userShortcuts
        this.loading = result.loading
        this.error = result.error
      },
      (err) => {
        if (err.message === 'Unauthorized') {
          this.authService.logout()
          this.router.navigate(['login'])
        }
      },
    )
  }

  getIcon(type: ShortcutType) {
    if (type === ShortcutType.ORGANISATION) {
      return 'people'
    } else {
      return 'account_circle'
    }
  }

  refresh() {
    this.listQuery?.refetch()
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe()
  }
}
