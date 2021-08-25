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
  editExercise = false;

  dataSource: MatTableDataSource<ITrainingPlan>;
  displayedColumns = ['trainingPlanId','trainingPlanName', 'stDate', 'workoutLength', 'endDate', 'workoutsPerWeek', 'workoutTypeId'];

  @Output() editModeChanged = new EventEmitter();

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
    this.editExercise = !this.editExercise;
  }

}
