import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwitterComponent } from './twitter/twitter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbInputModule, NbSelectModule, NbListModule, NbButtonComponent, NbCardBodyComponent, NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ApiPrefixInterceptor } from './core/http/http.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { TwitterApiService } from './service/twitter-api.service';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TwitterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    HttpClientModule,
  ],
  providers: [
    TwitterApiService,
    ApiPrefixInterceptor,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
