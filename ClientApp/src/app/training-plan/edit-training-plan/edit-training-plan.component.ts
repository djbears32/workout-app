import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { ExerciseLookupDialogComponent } from '../../exercises/exercise-lookup-dialog/exercise-lookup-dialog.component';
import { IExercises } from '../../models/IExcercises';
import { ITrainingPlan } from '../../models/ITrainingPlan';
import { IWorkoutSession } from '../../models/IWorkoutSession';
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
  workoutSessions = {} as IWorkoutSession[];

  editFieldsForm: FormGroup;


  constructor(private workoutService: WorkoutService,
    private dialog: MatDialog ) { }

  ngOnInit() {
    this.loadDropdown();
    this.getWorkoutSession();

    this.editFieldsForm = new FormGroup({
      id: new FormControl('-1'),
      trainingPlanId:  new FormControl(''),
      workoutDate: new FormControl(''),
      weekId: new FormControl(''),
      workoutDayId: new FormControl(''),
      exercise1: new FormControl(''),
      exercise2: new FormControl(''),
      exercise3: new FormControl(''),
      exercise4: new FormControl(''),
      exercise5: new FormControl(''),
      exercise6: new FormControl(''),
      exercise7: new FormControl(''),
      exercise8: new FormControl(''),
      exercise9: new FormControl('')
    })
  }

  submitEdit() {
    this.saving = true;
    let submittedForm: IWorkoutSession = {
      id: -1,
      trainingPlanId: this.editFieldsForm.get('trainingPlanId').value,
      workoutDate: this.editFieldsForm.get('workoutDate').value,
      weekId: this.editFieldsForm.get('weekId').value,
      workoutDayId: this.editFieldsForm.get('workoutDayId').value,
      exercise1: this.editFieldsForm.get('exercise1').value,
      exercise2: this.editFieldsForm.get('exercise2').value,
      exercise3: this.editFieldsForm.get('exercise3').value,
      exercise4: this.editFieldsForm.get('exercise4').value,
      exercise5: this.editFieldsForm.get('exercise5').value,
      exercise6: this.editFieldsForm.get('exercise6').value,
      exercise7: this.editFieldsForm.get('exercise7').value,
      exercise8: this.editFieldsForm.get('exercise8').value,
      exercise9: this.editFieldsForm.get('exercise9').value,
    }

    this.workoutService.updateWorkoutSessions(submittedForm)
      .pipe(
        finalize(() => { this.saving = false })
    )
      .subscribe(
        () => this.completeFormSubmission(),
        (error: Error) => this.errorMessage = error.message);
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

  getWorkoutSession() {
    this.workoutService.getWorkoutSessions().pipe(
      finalize(() => this.isLoadingData = false)
    )
      .subscribe((workoutSession: IWorkoutSession[]) => {
        this.workoutSessions = workoutSession;
        console.log(this.workoutSessions)
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

    //if (this.editFieldsForm.exercise1 == null)


  }
}
