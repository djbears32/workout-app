import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IExercises } from "../models/IExcercises";
import { IMuscleGroups } from "../models/IMuscleGroups";
import { ITrainingPlan } from "../models/ITrainingPlan";
import { IWorkoutType } from "../models/IWorkoutType";
import { IWorkoutSession } from "../models/IWorkoutSession";

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
  getWorkoutSessions() {
    var apiUrl = 'api/workout/getworkoutsession';
    return this.httpClient.get<IWorkoutSession[]>(apiUrl);
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

  updateWorkoutSessions(workoutSessionData) {
    var apiUrl = 'api/workout/addworkoutsessions';
    return this.httpClient.post(apiUrl, workoutSessionData);
  }


}
