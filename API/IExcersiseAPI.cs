using System.Collections.Generic;
using workout_app.ViewModels;

namespace workout_app.API
{
    public interface IExerciseAPI
    {
        List<ViewModels.ExerciseViewModel> GetExercises();
        List<ViewModels.MuscleGroupViewModel> getMuscleGroups();
        List<ViewModels.TrainingPlanViewModel> getTrainingPlans();
        void addExercises(ViewModels.ExerciseViewModel exerciseViewModel);
        void AddTrainingPlans(ViewModels.TrainingPlanViewModel trainingPlanViewModel);
    }
}