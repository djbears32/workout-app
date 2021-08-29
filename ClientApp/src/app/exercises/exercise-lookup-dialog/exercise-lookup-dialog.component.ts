import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IExercises } from 'src/app/models/IExcercises';
import { ITrainingPlan } from 'src/app/models/ITrainingPlan';
import { IWorkoutSession } from 'src/app/models/IWorkoutSession';
import { WorkoutService } from 'src/app/services/workout.services';

@Component({
  selector: 'app-exercise-lookup-dialog',
  templateUrl: './exercise-lookup-dialog.component.html',
  styleUrls: ['./exercise-lookup-dialog.component.css']
})
export class ExerciseLookupDialogComponent implements OnInit {

  ngUnsubscribe = new Subject();
  exerciseSearchCtrl = new FormControl();
  isLoadingData = true;
  errorMessage = '';

  dataSource: MatTableDataSource<IExercises>;
  displayedColumns = ['exerciseName', 'muscleGroupId'];

  trainingPlanSearchResult: ITrainingPlan;
  exerciseSearchResult: IExercises[] = [];

  workoutSessionData: IWorkoutSession;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor(private workoutService: WorkoutService,
              public dialogRef: MatDialogRef<ExerciseLookupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) 
              { 
                  this.trainingPlanSearchResult = data;
              }

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises() {
    this.workoutService.getExercises().pipe(
     finalize(() => this.isLoadingData = false)
   )
     .subscribe((exercises: IExercises[]) => {
       this.dataSource = new MatTableDataSource<IExercises>(exercises)
       this.dataSource.paginator = this.paginator
       this.dataSource.sort = this.sort
     },
       (error: Error) => this.errorMessage = error.message);
   }

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(exercise: IExercises)
  {
    this.exerciseSearchResult.push(exercise);
    console.log(this.exerciseSearchResult);
    console.log(this.trainingPlanSearchResult);
  }

  close() {
    this.dialogRef.close();
  }

  //addWorkoutSession() {
  //  this.workoutService.addWorkoutSessions(this.workoutSessionData)
  //   .pipe(
  //     finalize(() => { this.saving = false })
  //   )
  //      .subscribe(
  //        () => this.completeFormSubmission(),
  //        (error: Error) => this.errorMessage = error.message);
  //}

  //completeFormSubmission() {
  //  this.editClosed.emit();
  //  this.recordUpdated.emit(true);
  //}
}
