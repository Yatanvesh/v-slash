import { Component, OnDestroy, OnInit } from '@angular/core'
import { Apollo, QueryRef } from 'apollo-angular'
import { AuthService } from '../../core/services/auth.service'
import {
  Shortcut,
  ShortcutType,
  SortDirection,
  SortOptions,
} from '../../core/core.types'
import { Router } from '@angular/router'
import {
  COUNT_SHORTCUTS,
  DELETE_SHORTCUT,
  LIST_SHORTCUTS,
} from '../../core/gqlQueries'
import { Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { PageEvent } from '@angular/material/paginator'

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
  page = 0
  pageSize = 5
  countQuery: QueryRef<any> | undefined
  countQuerySubscription: Subscription | undefined
  shortcutCount: number | undefined

  sortOptions: SortOptions[] = [
    {
      name: 'Created Desc',
      key: 'createdAtIndex',
      direction: SortDirection.DESC,
    },
    {
      name: 'Created Asc',
      key: 'createdAtIndex',
      direction: SortDirection.ASC,
    },
    {
      name: 'Alphabetically Asc',
      key: 'shortLink',
      direction: SortDirection.ASC,
    },
    {
      name: 'Alphabetically Desc',
      key: 'shortLink',
      direction: SortDirection.DESC,
    },
    {
      name: 'Description Asc',
      key: 'description',
      direction: SortDirection.ASC,
    },
    {
      name: 'Description Desc',
      key: 'description',
      direction: SortDirection.DESC,
    },
  ]
  selectedSortOption = this.sortOptions[0]

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getShortcuts()
    this.getShortcutsCount()
    this.refresh()
  }

  getShortcuts() {
    this.listQuery = this.apollo.watchQuery<any>({
      query: LIST_SHORTCUTS,
      variables: this.getFetchVariables(),
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
    this.countQuery?.refetch()
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe()
  }

  deleteShortcut(uid: string | undefined, event: Event) {
    event.preventDefault()
    this.apollo
      .mutate({
        mutation: DELETE_SHORTCUT,
        variables: {
          uid,
        },
        context: this.authService.getGraphQlContext(),
      })
      .subscribe(
        (res) => {
          this._snackBar.open('Shortcut Deleted', 'Ok', {
            duration: 5000,
          })
          this.refresh()
        },
        (err) => {},
      )
  }

  private getShortcutsCount() {
    this.countQuery = this.apollo.watchQuery<any>({
      query: COUNT_SHORTCUTS,
      context: this.authService.getGraphQlContext(),
    })
    this.countQuerySubscription = this.countQuery.valueChanges.subscribe(
      (result: any) => {
        this.shortcutCount = result.data?.userShortcutsCount
      },
      (err) => {},
    )
  }

  getFetchVariables() {
    return {
      limit: this.pageSize,
      offset: this.pageSize * this.page,
      sortKey: this.selectedSortOption.key,
      sortDir: this.selectedSortOption.direction,
    }
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex
    this.listQuery?.refetch(this.getFetchVariables())
  }

  sortBy(sortOption: SortOptions) {
    this.selectedSortOption = sortOption
    this.listQuery?.refetch(this.getFetchVariables())
  }
}
