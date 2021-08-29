using System.Collections.Generic;
using workout_app.ViewModels;

namespace workout_app.API
{
    public interface IExerciseAPI
    {
        List<ViewModels.ExerciseViewModel> GetExercises();
        List<ViewModels.MuscleGroupViewModel> getMuscleGroups();
        List<ViewModels.TrainingPlanViewModel> getTrainingPlans();
        List<ViewModels.WorkoutTypeViewModel> getWorkoutTypes();
        void addExercises(ViewModels.ExerciseViewModel exerciseViewModel);
        void addMuscleGroups(ViewModels.MuscleGroupViewModel muscleGroupViewModel);
        void AddTrainingPlans(ViewModels.TrainingPlanViewModel trainingPlanViewModel);
        void AddWorkoutSessions(ViewModels.WorkoutSessionViewModel workoutSessionViewModel);
    }
}