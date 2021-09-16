import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { ITrainingPlan } from 'src/app/models/ITrainingPlan';
import { IMuscleGroups } from 'src/app/models/IMuscleGroups';
import { WorkoutService } from 'src/app/services/workout.services';
import { IWorkoutType } from 'src/app/models/IWorkoutType';

@Component({
  selector: 'app-add-training-plan',
  templateUrl: './add-training-plan.component.html',
  styleUrls: ['./add-training-plan.component.css']
})
export class AddTrainingPlanComponent implements OnInit {

  @Input() trainingPlanData: ITrainingPlan;
  @Output() editClosed = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();
  saving = false;
  updatedexerciseData: ITrainingPlan;
  errorMessage = '';
  isLoadingData = false;

  trainingPlan = {} as ITrainingPlan[];

  workoutTypes = {} as IWorkoutType[];

  editFieldsForm: FormGroup;

  constructor(private workoutService: WorkoutService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadDropdown();

    this.editFieldsForm = this.formBuilder.group({
      trainingPlanId: -1,
      trainingPlanName: new FormControl(this.trainingPlanData.trainingPlanName),
      startDate: new FormControl(this.trainingPlanData.startDate),
      workoutLength: [this.trainingPlanData.workoutLength],
      endDate: new FormControl(this.trainingPlanData.endDate),
      workoutsPerWeek: [this.trainingPlanData.workoutsPerWeek],
      workoutTypeId: [this.trainingPlanData.workoutTypeId],
    });
  }

  submitEdit() {
    this.saving = true;
      let submittedForm: ITrainingPlan = {
        trainingPlanId: -1,
        trainingPlanName: this.editFieldsForm.get('trainingPlanName').value,
        startDate: this.editFieldsForm.get('startDate').value,
        workoutLength: this.editFieldsForm.get('workoutLength').value,
        endDate: this.editFieldsForm.get('endDate').value,
        workoutsPerWeek: this.editFieldsForm.get('workoutsPerWeek').value,
        workoutTypeId: this.editFieldsForm.get('workoutTypeId').value
      }

      this.workoutService.updateTrainingPlans(submittedForm)
      .pipe(
        finalize(() => { this.saving = false })
      )
      .subscribe(
        () => this.completeFormSubmission(),
        (error: Error) => this.errorMessage = error.message
      );
    }

    completeFormSubmission() {
      this.editClosed.emit();
      this.recordUpdated.emit(true);
    }
  
    cancelEdit() {
      this.editClosed.emit();
    }

    loadDropdown() {
      this.workoutService.getWorkoutTypes().pipe(
        finalize(() => this.isLoadingData = false)
      )
        .subscribe((workoutTypesData: IWorkoutType[]) => {
          this.workoutTypes = workoutTypesData;
          console.log(this.workoutTypes);
        },
          (error: Error) => this.errorMessage = error.message);
      }
  
      //getMuscleTypeId(name: string) {
      //  var temp = this.workoutTypes.find( x => x.workoutTypeName === name).workoutTypeId
      //  return temp
      //}
}
