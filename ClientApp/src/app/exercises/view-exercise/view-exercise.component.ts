import { Component, OnInit, ViewChild } from '@angular/core';
import { IExercises } from 'src/app/models/IExcercises';
import { WorkoutService } from '../../services/workout.services'
import { finalize } from 'rxjs/operators';
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
    this.refreshExercises();
  }

  refreshExercises() {
     this.workoutService.getExercises().pipe(
      finalize(() => this.isLoadingData = false)
    )
      .subscribe((exercises: IExercises[]) => {
        this.dataSource = new MatTableDataSource<IExercises>(exercises)
        //this.dataSource.paginator = this.paginator
      },
        (error: Error) => this.errorMessage = error.message);
    }
}
