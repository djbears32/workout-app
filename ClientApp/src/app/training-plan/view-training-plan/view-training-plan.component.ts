import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ITrainingPlan } from 'src/app/models/ITrainingPlan';
import { WorkoutService } from '../../services/workout.services'
import { finalize } from 'rxjs/operators';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-training-plan',
  templateUrl: './view-training-plan.component.html',
  styleUrls: ['./view-training-plan.component.css']
})
export class ViewTrainingPlanComponent implements OnInit {
  errorMessage: string;
  isLoadingData = true;
  editTrainingPlan = false;

  dataSource: MatTableDataSource<ITrainingPlan>;
  displayedColumns = ['trainingPlanName', 'startDate', 'workoutLength', 'endDate', 'workoutsPerWeek', 'workoutTypeId', 'action'];

  @Output() editModeChanged = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  
  editTrainingPlanObj: ITrainingPlan = {
    trainingPlanId: 0,
    trainingPlanName: null,
    startDate: null,
    workoutLength: 0,
    endDate: null,
    workoutsPerWeek: 0,
    workoutTypeId: 0
  };

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.refreshTrainingPlan();
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

  toggleEdit() {
    this.editTrainingPlan = !this.editTrainingPlan;
  }

  editTraining() {

  }

  onRecordUpdated(updateSucessful: boolean)
    {
      this.recordUpdated.emit(updateSucessful);
    };

}
