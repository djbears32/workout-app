using System.Linq;
using System.Collections.Generic;
using workout_app.ViewModels;
using workout_app.DAL.Models;

namespace workout_app.API
{
    public class ExerciseAPI : IExerciseAPI
    {
        DAL.UnitOfWork.IUnitOfWork unitOfWork;
        DAL.Repositories.IExerciseRepository exerciseRepo;
        DAL.Repositories.IMuscleGroupRepository muscleGroupRepo;

        public ExerciseAPI(
            DAL.UnitOfWork.IUnitOfWork unitOfWork,
            DAL.Repositories.IExerciseRepository exerciseRepo,
            DAL.Repositories.IMuscleGroupRepository muscleGroupRepo)
            {
                this.unitOfWork = unitOfWork;
                this.exerciseRepo = exerciseRepo;
                this.muscleGroupRepo = muscleGroupRepo;
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

        public List<ViewModels.MuscleGroupViewModel> getMuscleGroups()
        {
            var muscleGroupInfoList = new List<ViewModels.MuscleGroupViewModel>();

            var muscleGroupInfo = this.muscleGroupRepo.GetQueryable()
                .Where(x => x.MuscleGroupId != 0);

            muscleGroupInfoList = muscleGroupInfo
                .Select(entry => new
                {
                    entry.MuscleGroupId,
                    entry.MuscleGroupName
                })
                .OrderBy(entry => entry.MuscleGroupId)
                .ToList()
                .Select(entry => new MuscleGroupViewModel
                {
                    MuscleGroupId = entry.MuscleGroupId,
                    MuscleGroupName = entry.MuscleGroupName
                })
                .ToList();

            return muscleGroupInfoList;
        }

        public void addExercises(ExerciseViewModel exerciseInfoForm)
        {
            var exerciseEntity = new Exercise
            {
                ExerciseId = 0,
                ExerciseName = exerciseInfoForm.ExerciseName,
                MuscleGroupId = exerciseInfoForm.MuscleGroupId
            };
            
            this.exerciseRepo.Add(exerciseEntity);
            this.unitOfWork.Commit();
        }
    }
}