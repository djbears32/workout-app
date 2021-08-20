import { Component, OnInit, ViewChild } from '@angular/core';
import { IExercises } from 'src/app/models/IExcercises';
import { WorkoutService } from '../../services/workout.services'
import { MatPaginator} from '@angular/material/paginator';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-exercise',
  templateUrl: './view-exercise.component.html',
  styleUrls: ['./view-exercise.component.css']
})
export class ViewExerciseComponent implements OnInit {
  errorMessage: string;
  isLoadingData = true;

  dataSource: MatTableDataSource<IExercises>;
  displayedColumns = ['exerciseId','exerciseName','muscleGroupId'];
  //@ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  //@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() { 
    this.getExer();
   }

   public getExer = () => {
     this.workoutService.getExercises()
     .subscribe(res => {
       this.dataSource.data = res as IExercises[];
     })
   }
}
