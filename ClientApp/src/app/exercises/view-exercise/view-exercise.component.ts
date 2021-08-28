import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { IExercises } from 'src/app/models/IExcercises';
import { WorkoutService } from '../../services/workout.services'
import { finalize } from 'rxjs/operators';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort, MatTableDataSource } from '@angular/material';
import { IMuscleGroups } from '../../models/IMuscleGroups';

@Component({
  selector: 'app-view-exercise',
  templateUrl: './view-exercise.component.html',
  styleUrls: ['./view-exercise.component.css']
})
export class ViewExerciseComponent implements OnInit {
  errorMessage: string;
  isLoadingData = true;
  editExercise = false;
  editMuscleGroup = false;

  dataSource: MatTableDataSource<IExercises>;
  displayedColumns = ['exerciseName','muscleGroupId'];

  @Output() editModeChanged = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  editExerciseObj: IExercises = {
    exerciseId: 0,
    exerciseName: null,
    muscleGroupId: 0
  };

  editMuscleGroupObj: IMuscleGroups = {
    muscleGroupId: 0,
    muscleGroupName: null
  }

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
        this.dataSource.sort = this.sort
      },
        (error: Error) => this.errorMessage = error.message);
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  toggleExerciseEdit() {
    this.editExercise = !this.editExercise;
    if (this.editExercise == true)
    {
      this.editMuscleGroup = false;
    }
    
  }

  toggleMuscleGroupEdit() {
    this.editMuscleGroup = !this.editMuscleGroup;
    if (this.editMuscleGroup == true)
    {
      this.editExercise = false;
    }
  }

    onRecordUpdated(updateSucessful: boolean)
    {
      this.recordUpdated.emit(updateSucessful);
    };
}
