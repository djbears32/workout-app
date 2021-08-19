import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IExercises } from 'src/app/models/IExcercises';
import { WorkoutService } from '../../services/workout.services'
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-view-exercise',
  templateUrl: './view-exercise.component.html',
  styleUrls: ['./view-exercise.component.css']
})
export class ViewExerciseComponent implements OnInit {
  dataSource: MatTableDataSource<IExercises>;
  errorMessage: string;
  displayedColumns = ['exerciseId','exerciseName','muscleGroupId'];
  isLoadingData = true;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

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
        this.dataSource.paginator = this.paginator
      },
        (error: Error) => this.errorMessage = error.message);

  }
}
