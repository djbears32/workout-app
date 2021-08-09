import { HttpClient } from "@angular/common/http";
import { IExercises } from "../models/IExcercises";

export class WorkoutService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getExercises()
    {
        var apiUrl = 'api/exercise/getexercises';
        return this.httpClient.get<IExercises[]>(apiUrl);
    }


}