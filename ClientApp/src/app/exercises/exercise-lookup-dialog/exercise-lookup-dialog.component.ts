import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IExercises } from 'src/app/models/IExercises';
import { ITrainingPlan } from 'src/app/models/ITrainingPlan';
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

  trainingPlanData: ITrainingPlan;
  exerciseSearchResult: IExercises;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor(private workoutService: WorkoutService,
              public dialogRef: MatDialogRef<ExerciseLookupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) 
              { 
    this.trainingPlanData = data;
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
    this.exerciseSearchResult = exercise;
    console.log(this.exerciseSearchResult);
  }

  close() {
    this.dialogRef.close();
  }
}
