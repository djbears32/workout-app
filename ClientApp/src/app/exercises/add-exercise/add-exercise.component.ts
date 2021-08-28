import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private workoutService: WorkoutService,
    private formBuilder: FormBuilder) {  

     }

  ngOnInit() {
    this.loadDropdown();

    this.editFieldsForm = this.formBuilder.group({
      exerciseId: -1,
      exerciseName: new FormControl(this.exerciseData.exerciseName, Validators.compose([Validators.required, Validators.maxLength(40)])),
      muscleGroupId: [this.exerciseData.muscleGroupId]
    });
   }

  submitEdit() {
    this.saving = true;
      let submittedForm: IExercises = {
        exerciseId: -1,
        exerciseName: this.editFieldsForm.get('exerciseName').value,
        muscleGroupId: this.editFieldsForm.get('muscleGroupId').value
      }
      

    this.workoutService.updateExercises(submittedForm)
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
