import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { IWorkoutType } from '../../models/IWorkoutType';
import { WorkoutService } from '../../services/workout.services';

@Component({
  selector: 'app-add-workout-type',
  templateUrl: './add-workout-type.component.html',
  styleUrls: ['./add-workout-type.component.css']
})
export class AddWorkoutTypeComponent implements OnInit {

  @Input() workoutTypeData: IWorkoutType;
  @Output() editClosed = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();
  saving = false;
  errorMessage = '';
  isLoadingData = false;

  workoutTypes = {} as IWorkoutType[];

  editFieldsForm: FormGroup;

  constructor(private workoutService: WorkoutService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.editFieldsForm = this.formBuilder.group({
      workoutTypeId: [this.workoutTypeData.workoutTypeId],
      workoutTypeName: [this.workoutTypeData.workoutTypeName],
    })
  }

  submitEdit() {
    this.saving = true;
    let submittedForm: IWorkoutType = {
      workoutTypeId: this.editFieldsForm.get('workoutTypeId').value,
      workoutTypeName: this.editFieldsForm.get('workoutTypeName').value
    }

    this.workoutService.updateWorkoutTypes(submittedForm)
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

}
