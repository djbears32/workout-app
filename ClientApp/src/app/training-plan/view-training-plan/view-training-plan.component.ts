import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { ITrainingPlan } from 'src/app/models/ITrainingPlan';
import { WorkoutService } from '../../services/workout.services'
import { finalize } from 'rxjs/operators';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { ExerciseLookupDialogComponent } from 'src/app/exercises/exercise-lookup-dialog/exercise-lookup-dialog.component';
import { IWorkoutType } from 'src/app/models/IWorkoutType';
import { IExercises } from 'src/app/models/IExercises';

@Component({
  selector: 'app-view-training-plan',
  templateUrl: './view-training-plan.component.html',
  styleUrls: ['./view-training-plan.component.css']
})
export class ViewTrainingPlanComponent implements OnInit {
  errorMessage: string;
  isLoadingData = true;
  editTrainingPlan = false;
  editWorkoutType = false;

  dataSource: MatTableDataSource<ITrainingPlan>;
  displayedColumns = ['trainingPlanName', 'startDate', 'workoutLength', 'endDate', 'workoutsPerWeek', 'workoutTypeId',
    //'action'
  ];

  @Input() exerciseInfoData: IExercises;

  @Output() editModeChanged = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  selectedExercise: IExercises;
  
  editTrainingPlanObj: ITrainingPlan = {
    trainingPlanId: 0,
    trainingPlanName: null,
    startDate: null,
    workoutLength: 0,
    endDate: null,
    workoutsPerWeek: 0,
    workoutTypeId: 0
  };

  editWorkoutTypeObj: IWorkoutType = {
    workoutTypeId: 0,
    workoutTypeName: null
  }

  constructor(private workoutService: WorkoutService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshTrainingPlan();

    this.selectedExercise = {
      exerciseId: null,
      exerciseName: null,
      muscleGroupId: null
    }

  }

  refreshTrainingPlan() {
    this.workoutService.getTrainingPlans().pipe(
     finalize(() => this.isLoadingData = false)
   )
     .subscribe((trainingPlan: ITrainingPlan[]) => {
       this.dataSource = new MatTableDataSource<ITrainingPlan>(trainingPlan)
       this.dataSource.paginator = this.paginator
       this.dataSource.sort = this.sort
     },
       (error: Error) => this.errorMessage = error.message);
   }

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleTrainingPlanEdit() {
    this.editTrainingPlan = !this.editTrainingPlan;
    if (this.editTrainingPlan == true) {
      this.editWorkoutType = false;
    }
  }

  toggleWorkoutTypeEdit() {
    this.editWorkoutType = !this.editWorkoutType;
    if (this.editWorkoutType == true) {
      this.editTrainingPlan = false;
    }
  }

  openExerciseSearchDialog(trainingPlan: ITrainingPlan) {

    const dialogRef = this.dialog.open(ExerciseLookupDialogComponent, { width: '1000px', data: trainingPlan });

  }

  onRecordUpdated(updateSucessful: boolean)
    {
    this.recordUpdated.emit(updateSucessful);
    this.refreshTrainingPlan();
    };

}
