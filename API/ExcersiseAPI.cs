using System.Linq;
using System.Collections.Generic;
using workout_app.Repositories;
using workout_app.ViewModels;

namespace workout_app.API
{
    public class ExerciseAPI : IExerciseAPI
    {
        //DAL.UnitOfWork.IExerciseUnitOfWork exerciseUOW;
        Factories.IRepositoryFactory repositoryFactory;
        Repositories.IExerciseRepository exerciseRepo;

        public ExerciseAPI(
            Factories.IRepositoryFactory repositoryFactory,
            Repositories.IExerciseRepository exerciseRepo)
            {
                this.repositoryFactory = repositoryFactory;
                this.exerciseRepo = exerciseRepo;
            }
        public List<ViewModels.ExerciseViewModel> GetExercises()
        {
            var exerciseInfoList = new List<ViewModels.ExerciseViewModel>();

            var exerciseInfo = this.exerciseRepo.GetQueryable()
                .Where(x => x.ExerciseId != 0);

            exerciseInfoList = exerciseInfo
                .Select(entry => new
                {
                    entry.ExerciseId,
                    entry.ExerciseName,
                    entry.MuscleGroupId
                })
                .OrderBy(entry => entry.ExerciseId)
                .ToList()
                .Select(entry => new ExerciseViewModel
                {
                    ExerciseId = entry.ExerciseId,
                    ExerciseName = entry.ExerciseName,
                    MuscleGroupId = entry.MuscleGroupId
                })
                .ToList();

            return exerciseInfoList;
        }
    }
}