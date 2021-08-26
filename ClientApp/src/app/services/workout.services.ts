import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IExercises } from "../models/IExcercises";
import { IMuscleGroups } from "../models/IMuscleGroups";
import { ITrainingPlan } from "../models/ITrainingPlan";

@Injectable({
    providedIn: 'root'
})

export class WorkoutService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getExercises()
    {
        var apiUrl = 'api/workout/getexercises';
        return this.httpClient.get<IExercises[]>(apiUrl);
    }

    getMuscleGroups()
    {
        var apiUrl = 'api/workout/getmusclegroups';
        return this.httpClient.get<IMuscleGroups[]>(apiUrl);
    }

    getTrainingPlans()
    {
        var apiUrl = 'api/workout/gettrainingplans';
        return this.httpClient.get<ITrainingPlan[]>(apiUrl);
    }

    updateExercises(exerciseData)
    {
        var apiUrl = 'api/workout/addexercises';
        return this.httpClient.post(apiUrl, exerciseData);
    }

    updateTrainingPlans(trainingPlanData)
    {
        var apiUrl = 'api/workout/addtrainingplans';
        return this.httpClient.post(apiUrl, trainingPlanData);
    }


}