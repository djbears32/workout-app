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

    getMuscleGroups()
    {
        var apiUrl = 'api/workout/getmusclegroups';
        return this.httpClient.get<IMuscleGroups[]>(apiUrl);
    }

    updateExercises(exerciseData)
    {
        var apiUrl = 'api/workout/addexercises';
        return this.httpClient.post(apiUrl, exerciseData);
    }


}