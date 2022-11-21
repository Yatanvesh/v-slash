import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { ListComponent } from './components/list/list.component'
import { AuthGuard } from './core/guards/login.guard'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http'
import { LoggedInGuard } from './core/guards/loggedIn.guard'
import { InMemoryCache } from '@apollo/client/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { environment } from '../environments/environment'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { NavComponent } from './components/nav/nav.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { CreateShortcutComponent } from './components/create-shortcut/create-shortcut.component'
import { MatRadioModule } from '@angular/material/radio'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { TagsComponent } from './components/tags/tags.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu';
import { SearchComponent } from './components/search/search.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    NavComponent,
    CreateShortcutComponent,
    TagsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    ApolloModule,
    NgxSkeletonLoaderModule,
    MatChipsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatRadioModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  providers: [
    AuthGuard,
    LoggedInGuard,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: `${environment.baseUrl}/graphql`,
          }),
        }
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
