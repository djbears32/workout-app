import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { ExerciseLookupDialogComponent } from '../../exercises/exercise-lookup-dialog/exercise-lookup-dialog.component';
import { IExercises } from '../../models/IExercises';
import { IExerciseWorkout } from '../../models/IExerciseWorkout';
import { ITrainingPlan } from '../../models/ITrainingPlan';
import { IWorkout } from '../../models/IWorkout';
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

  exerciseWorkoutData: IExerciseWorkout = {
  id: 0,
  workoutId: 0,
  exerciseId: 0,
  weight: null,
  reps: null,
  inactive: true
  } //generic model passed to form group

  workoutData: IWorkout = {
    workoutId: 0,
    trainingPlanId: 0,
    date: null
  }

  exerciseHolder = {} as IExercises; //stores exercise returned from add exercises dialog

  trainingPlans = {} as ITrainingPlan[];

  editFieldsForm: FormGroup;


  constructor(private workoutService: WorkoutService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder  ) { }

  ngOnInit() {
    this.loadDropdown();

    this.editFieldsForm = this.formBuilder.group({
      id: [this.exerciseWorkoutData.id],
      workoutId: [this.exerciseWorkoutData.workoutId],
      exerciseId: [this.exerciseWorkoutData.exerciseId]
    });
  }

  submitEdit() {
    this.saving = true;
    let submittedForm: IExerciseWorkout = {
      id: -1,
      workoutId: -1,
      exerciseId: this.editFieldsForm.get('exerciseId').value,
      weight: null,
      reps: this.editFieldsForm.get('reps').value,
      inactive: false
    }
    console.log(submittedForm);
      //this.workoutService.updateExercises(submittedForm)
      //.pipe(
      //  finalize(() => { this.saving = false })
      //)
      //.subscribe(
      //  () => this.completeFormSubmission(),
      //  (error: Error) => this.errorMessage = error.message);

    //let submittedForm1: IWorkout = {
    //  workoutId: -1,
    //  trainingPlanId: this.editFieldsForm.get('trainingPlanId').value,
    //  date: null
    //}
    //this.workoutService.updateExercises(submittedForm)
      //.pipe(
      //  finalize(() => { this.saving = false })
      //)
      //.subscribe(
      //  () => this.completeFormSubmission(),
      //  (error: Error) => this.errorMessage = error.message);
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
        if (results) {
          this.editFieldsForm.get('exerciseId').setValue(results.exerciseId);
          this.editFieldsForm.get('muscleGroupId').setValue(results.muscleGroupId);
        }
        this.exerciseHolder = results;
      })
    console.log(this.exerciseHolder);
  }
}
