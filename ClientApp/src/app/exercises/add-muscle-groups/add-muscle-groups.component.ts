import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { IExercises } from '../../models/IExcercises';
import { IMuscleGroups } from '../../models/IMuscleGroups';
import { IWorkoutType } from '../../models/IWorkoutType';
import { WorkoutService } from '../../services/workout.services';

@Component({
  selector: 'app-add-muscle-groups',
  templateUrl: './add-muscle-groups.component.html',
  styleUrls: ['./add-muscle-groups.component.css']
})
export class AddMuscleGroupsComponent implements OnInit {

  @Input() muscleGroupData: IMuscleGroups;
  @Output() editClosed = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();
  updatedMuscleGroupData: IMuscleGroups;
  saving = false;
  errorMessage = '';
  isLoadingData = false;

  editFieldsForm: FormGroup;

  constructor(private workoutService: WorkoutService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editFieldsForm = this.formBuilder.group({
      muscleGroupId: -1,
      muscleGroupName: new FormControl(this.muscleGroupData.muscleGroupName, Validators.compose([Validators.required, Validators.maxLength(40)]))
    })
  }

  submitEdit() {
    this.saving = true;
    let submittedForm: IMuscleGroups = {
      muscleGroupId: -1,
      muscleGroupName: this.editFieldsForm.get('muscleGroupName').value
    }

    this.workoutService.updateMuscleGroups(submittedForm)
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

  cancelEdit() {
    this.editClosed.emit();
  }

}
