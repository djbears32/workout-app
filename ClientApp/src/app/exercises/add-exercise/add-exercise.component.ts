import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { finalize } from 'rxjs/operators';

import { IExercises } from 'src/app/models/IExcercises';
import { IMuscleGroups } from 'src/app/models/IMuscleGroups';
import { WorkoutService } from 'src/app/services/workout.services';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  @Input() exerciseData: IExercises;
  @Input() muscleGroupData: IMuscleGroups;
  @Output() editClosed = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();
  saving = false;
  updatedexerciseData: IExercises;
  updatedmuscleGroupData: IMuscleGroups;
  errorMessage = '';

  editFieldsForm = new FormGroup({
    exerciseName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(40)])),
    muscleGroup: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(40)]))
  })

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {

    var defaultObj: IExercises = {
      exerciseId: 0,
      exerciseName: null,
      muscleGroupId: 0
    }
    var muscleGroupName: IMuscleGroups = {
      muscleGroupId: 0,
      muscleGroupName: null
    }

    this.editFieldsForm.get('exerciseName').setValue(this.exerciseData.exerciseName);
    this.editFieldsForm.get('muscleGroupName').setValue(this.muscleGroupData.muscleGroupName);
  }

  submitEdit() {
    this.saving = true;
    try {
      this.updatedexerciseData = this.updatedexerciseData;
      this.updatedexerciseData.exerciseName = this.editFieldsForm.get('exerciseName').value;
      this.updatedmuscleGroupData = this.updatedmuscleGroupData;
      this.updatedmuscleGroupData.muscleGroupName = this.editFieldsForm.get('muscleGroupName').value;
    }
    catch (error) {
      console.error(error);
      this.errorMessage = 'An error prevented the record from being submitted.';
      this.saving = false;
      return;
    }

    this.workoutService.updateExercises(this.updatedexerciseData, this.updatedmuscleGroupData)
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
