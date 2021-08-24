import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Output() editClosed = new EventEmitter();
  @Output() recordUpdated = new EventEmitter<boolean>();
  saving = false;
  updatedexerciseData: IExercises;
  errorMessage = '';
  isLoadingData = false;

  muscleGroups = {} as IMuscleGroups[];

  editFieldsForm: FormGroup;

  constructor(private workoutService: WorkoutService) {   }

  ngOnInit() {
    this.loadDropdown();

    this.editFieldsForm = new FormGroup({
      exerciseName: new FormControl(this.exerciseData.exerciseName, Validators.compose([Validators.required, Validators.maxLength(40)]))
    });
   }

  submitEdit() {
    this.saving = true;
    try {
      this.updatedexerciseData = this.updatedexerciseData;
      this.updatedexerciseData.exerciseId = -1;
      this.updatedexerciseData.exerciseName = this.editFieldsForm.get('exerciseName').value;
      this.updatedexerciseData.muscleGroupId = this.getMuscleGroupId(this.editFieldsForm.get('muscleGroupName').value);
    }
    catch (error) {
      console.error(error);
      this.errorMessage = 'An error prevented the record from being submitted.';
      this.saving = false;
      return;
    } 

    this.workoutService.updateExercises(this.updatedexerciseData)
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
    this.workoutService.getMuscleGroups().pipe(
      finalize(() => this.isLoadingData = false)
    )
      .subscribe((muscleGroupsData: IMuscleGroups[]) => {
        this.muscleGroups = muscleGroupsData;
        console.log(this.muscleGroups);
      },
        (error: Error) => this.errorMessage = error.message);
    }

    getMuscleGroupId(name: string) {
      var temp = this.muscleGroups.find( x => x.muscleGroupName === name).muscleGroupId
      return temp
    }
}
