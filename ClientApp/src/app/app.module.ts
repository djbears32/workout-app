import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatSelectModule, MatInputModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BannerComponent } from './banner/banner.component';
import { AddWorkoutComponent } from './workout/add-workout/add-workout.component';
import { ViewExerciseComponent } from './exercises/view-exercise/view-exercise.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddExerciseComponent } from './exercises/add-exercise/add-exercise.component';
import { DeleteExerciseComponent } from './exercises/delete-exercise/delete-exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BannerComponent,
    AddWorkoutComponent,
    ViewExerciseComponent,
    AddExerciseComponent,
    DeleteExerciseComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'add-workout', component: AddWorkoutComponent },
      { path: 'view-exercise', component: ViewExerciseComponent },
    ]),
    BrowserAnimationsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
