import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IExercises } from "../models/IExercises";
import { IMuscleGroups } from "../models/IMuscleGroups";
import { ITrainingPlan } from "../models/ITrainingPlan";
import { IWorkoutType } from "../models/IWorkoutType";

@Injectable({
  providedIn: 'root'
})

export class WorkoutService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getExercises() {
    var apiUrl = 'api/workout/getexercises';
    return this.httpClient.get<IExercises[]>(apiUrl);
  }

  getMuscleGroups() {
    var apiUrl = 'api/workout/getmusclegroups';
    return this.httpClient.get<IMuscleGroups[]>(apiUrl);
  }

  getTrainingPlans() {
    var apiUrl = 'api/workout/gettrainingplans';
    return this.httpClient.get<ITrainingPlan[]>(apiUrl);
  }

  getWorkoutTypes() {
    var apiUrl = 'api/workout/getworkouttypes';
    return this.httpClient.get<IWorkoutType[]>(apiUrl);
  }

  updateExercises(exerciseData) {
    var apiUrl = 'api/workout/addexercises';
    return this.httpClient.post(apiUrl, exerciseData);
  }

  updateMuscleGroups(muscleGroupData) {
    var apiUrl = 'api/workout/addmusclegroups';
    return this.httpClient.post(apiUrl, muscleGroupData);
  }

  updateTrainingPlans(trainingPlanData) {
    var apiUrl = 'api/workout/addtrainingplans';
    return this.httpClient.post(apiUrl, trainingPlanData);
  }

  updateWorkoutTypes(workoutTypeData) {
    var apiUrl = 'api/workout/addworkouttypes';
    return this.httpClient.post(apiUrl, workoutTypeData);
  }
}
