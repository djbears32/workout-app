import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IExercises } from "../models/IExcercises";
import { IMuscleGroups } from "../models/IMuscleGroups";

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

    updateExercises(exerciseData, muscleGroupData)
    {
        var apiUrl = 'api/workout/addexercises';
        return this.httpClient.get<IExercises[], IMuscleGroups[]>(apiUrl);
    }


}