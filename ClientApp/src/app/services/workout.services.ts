import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IExercises } from "../models/IExcercises";

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


}