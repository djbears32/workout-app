import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatSelectModule, MatInputModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BannerComponent } from './banner/banner.component';
import { AddWorkoutComponent } from './workout/add-workout/add-workout.component';
import { ViewExerciseComponent } from './exercises/view-exercise/view-exercise.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddExerciseComponent } from './exercises/add-exercise/add-exercise.component';
import { ViewWorkoutComponent } from './workout/view-workout/view-workout.component';
import { ViewTrainingPlanComponent } from './training-plan/view-training-plan/view-training-plan.component';
import { AddTrainingPlanComponent } from './training-plan/add-training-plan/add-training-plan.component';
import { WorkoutLookupDialogComponent } from './workout/workout-lookup-dialog/workout-lookup-dialog.component';
import { ExerciseLookupDialogComponent } from './exercises/exercise-lookup-dialog/exercise-lookup-dialog.component';
import { AddMuscleGroupsComponent } from './exercises/add-muscle-groups/add-muscle-groups.component';
import { EditTrainingPlanComponent } from './training-plan/edit-training-plan/edit-training-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FetchDataComponent,
    BannerComponent,
    AddWorkoutComponent,
    ViewExerciseComponent,
    AddExerciseComponent,
    ViewWorkoutComponent,
    ViewTrainingPlanComponent,
    AddTrainingPlanComponent,
    WorkoutLookupDialogComponent,
    ExerciseLookupDialogComponent,
    AddMuscleGroupsComponent,
    EditTrainingPlanComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'add-workout', component: AddWorkoutComponent },
      { path: 'view-exercise', component: ViewExerciseComponent },
      { path: 'view-training-plan', component: ViewTrainingPlanComponent },
      { path: 'add-training-plan', component: AddTrainingPlanComponent },
      { path: 'edit-training-plan', component: EditTrainingPlanComponent }
    ]),
    BrowserAnimationsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {  }

