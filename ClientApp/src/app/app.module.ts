import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BannerComponent } from './banner/banner.component';
import { AddWorkoutComponent } from './workout/add-workout/add-workout.component';
import { ViewWorkoutsComponent } from './workout/view-workouts/view-workouts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BannerComponent,
    AddWorkoutComponent,
    ViewWorkoutsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'add-workout', component: AddWorkoutComponent },
      { path: 'view-workout', component: ViewWorkoutsComponent },
    ]),
    BrowserAnimationsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
