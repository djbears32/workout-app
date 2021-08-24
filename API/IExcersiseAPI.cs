using System.Collections.Generic;
using workout_app.ViewModels;

namespace workout_app.API
{
    public interface IExerciseAPI
    {
        List<ViewModels.ExerciseViewModel> GetExercises();
        List<ViewModels.MuscleGroupViewModel> getMuscleGroups();
        void addExercises(ViewModels.ExerciseViewModel exerciseViewModel);
    }
}