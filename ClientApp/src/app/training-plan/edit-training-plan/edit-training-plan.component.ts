import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { ExerciseLookupDialogComponent } from '../../exercises/exercise-lookup-dialog/exercise-lookup-dialog.component';
import { IExercises } from '../../models/IExcercises';
import { ITrainingPlan } from '../../models/ITrainingPlan';
import { WorkoutService } from '../../services/workout.services';

@Component({
  selector: 'app-edit-training-plan',
  templateUrl: './edit-training-plan.component.html',
  styleUrls: ['./edit-training-plan.component.css']
})
export class EditTrainingPlanComponent implements OnInit {
  @Output() editClosed = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();

  isLoadingData = false;
  errorMessage = '';
  saving = false;
  workoutsWeekly = 0;  //stores trainingplan.workoutsperweek value set by user in first dropdown
  currentWorkout = 1; //stores current workoutsession value
  exerciseHolder = {} as IExercises[]; //stores exercise returned from add exercises dialog

  trainingPlans = {} as ITrainingPlan[];

  editFieldsForm: FormGroup;


  constructor(private workoutService: WorkoutService,
    private dialog: MatDialog ) { }

  ngOnInit() {
    this.loadDropdown();
  }

  submitEdit() {
    this.saving = true;
  }

  completeFormSubmission() {
    this.editClosed.emit();
    this.recordUpdated.emit(true);
  }

  valueChanged() {
    this.workoutsWeekly = this.trainingPlans.find(x => x.trainingPlanId === x.trainingPlanId).workoutsPerWeek
  }

  loadDropdown() {
    this.workoutService.getTrainingPlans().pipe(
      finalize(() => this.isLoadingData = false)
    )
      .subscribe((trainingPlans: ITrainingPlan[]) => {
        this.trainingPlans = trainingPlans;
      },
        (error: Error) => this.errorMessage = error.message);
  }

  openExerciseSearchDialog() {

    const dialogRef = this.dialog.open(ExerciseLookupDialogComponent, { width: '1000px'});

    dialogRef.afterClosed()
      .pipe()
      .subscribe(results => {
        this.exerciseHolder = results;
      })

  }
}
