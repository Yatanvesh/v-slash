import { Component, OnInit } from '@angular/core'
import { Shortcut, ShortcutType } from '../../core/core.types'
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
  tap,
} from 'rxjs'
import { Apollo, QueryRef } from 'apollo-angular'
import { SEARCH_SHORTCUTS } from '../../core/gqlQueries'
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  shortcuts: Shortcut[] = []
  loading = false
  error: any
  querySubscription: Subscription | undefined
  listQuery: QueryRef<any> | undefined
  searchTerm = ''
  keyPress$ = new Subject()
  dirty = false

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit(): void {
    this.keyPress$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((value) => {
          this.initiateSearch(value as string)
        }),
      )
      .subscribe()
  }

  getIcon(type: ShortcutType) {
    if (type === ShortcutType.ORGANISATION) {
      return 'people'
    } else {
      return 'account_circle'
    }
  }

  searchTermChanged() {
    this.keyPress$.next(this.searchTerm)
  }

  private initiateSearch(searchTerm: string) {
    this.dirty = true
    this.loading = true
    this.listQuery = this.apollo.watchQuery<any>({
      query: SEARCH_SHORTCUTS,
      variables: {
        searchTerm,
      },
      context: this.authService.getGraphQlContext(),
    })
    this.listQuery.refetch()
    this.querySubscription = this.listQuery.valueChanges.subscribe(
      (result: any) => {
        this.shortcuts = result.data?.searchShortcut
        this.loading = result.loading
        this.error = result.error
      },
      (err) => {
        this.loading = false
      },
    )
  }
}
