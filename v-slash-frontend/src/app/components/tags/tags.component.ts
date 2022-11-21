import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material/chips'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { FormControl } from '@angular/forms'
import { map, Observable, startWith, Subscription, tap } from 'rxjs'
import { Apollo, QueryRef } from 'apollo-angular'
import { CREATE_TAG, LIST_TAGS } from '../../core/gqlQueries'
import { AuthService } from '../../core/services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Tag } from '../../core/core.types'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA]
  tagCtrl = new FormControl('')
  filteredTags: Observable<Tag[]>
  tags: Tag[] = []
  allTags: Tag[] = []
  @Output() tagsChanged = new EventEmitter<string[]>()

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined
  private tagsQuery: QueryRef<any> | undefined
  private querySubscription: Subscription | undefined

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice(),
      ),
      tap(() => {
        this.tagsChanged.emit(this.tags.map((tag) => tag.tag))
      }),
    )
  }

  ngOnInit() {
    this.getTags()
  }

  getTags() {
    this.tagsQuery = this.apollo.watchQuery<any>({
      query: LIST_TAGS,
      context: this.authService.getGraphQlContext(),
    })
    this.querySubscription = this.tagsQuery.valueChanges.subscribe(
      (result: any) => {
        this.allTags = result.data?.tags
      },
      (err) => {},
    )
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()
    const tag = {
      tag: value,
    }
    this.apollo
      .mutate({
        mutation: CREATE_TAG,
        variables: tag,
        context: this.authService.getGraphQlContext(),
      })
      .subscribe(
        (res) => {
          this._snackBar.open('Tag Added', 'Ok', {
            duration: 5000,
          })
          this.tagsQuery?.refetch()
        },
        (err) => {},
      )
    if (value) {
      this.tags.push(tag)
    }
    event.chipInput!.clear()

    this.tagCtrl.setValue(null)
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag)

    if (index >= 0) {
      this.tags.splice(index, 1)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push({ tag: event.option.viewValue })
    if (this.tagInput) {
      this.tagInput.nativeElement.value = ''
    }
    this.tagCtrl.setValue(null)
  }

  private _filter(value: Tag | string): Tag[] {
    const filterValue =
      typeof value === 'string' ? value.toLowerCase() : value.tag.toLowerCase()

    return this.allTags.filter((tag) =>
      tag.tag.toLowerCase().includes(filterValue),
    )
  }
}
