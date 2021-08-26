export interface ITrainingPlan {
    trainingPlanId: number,
    trainingPlanName: string,
    startDate: Date,
    workoutLength: number,
    endDate: Date,
    workoutsPerWeek: number,
    workoutTypeId: number,
}