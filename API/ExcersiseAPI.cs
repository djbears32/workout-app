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
        DAL.Repositories.ITrainingPlanRepository trainingPlanRepo;

        public ExerciseAPI(
            DAL.UnitOfWork.IUnitOfWork unitOfWork,
            DAL.Repositories.IExerciseRepository exerciseRepo,
            DAL.Repositories.IMuscleGroupRepository muscleGroupRepo,
            DAL.Repositories.ITrainingPlanRepository trainingPlanRepo)
            {
                this.unitOfWork = unitOfWork;
                this.exerciseRepo = exerciseRepo;
                this.muscleGroupRepo = muscleGroupRepo;
                this.trainingPlanRepo = trainingPlanRepo;
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

        public List<ViewModels.TrainingPlanViewModel> getTrainingPlans()
        {
            var trainingPlanInfoList = new List<ViewModels.TrainingPlanViewModel>();

            var trainingPlanInfo = this.trainingPlanRepo.GetQueryable()
                .Where(x => x.TrainingPlanId != 0);

            trainingPlanInfoList = trainingPlanInfo
                .Select(entry => new
                {
                    entry.TrainingPlanId,
                    entry.TrainingPlanName,
                    entry.StartDate,
                    entry.WorkoutLength,
                    entry.EndDate,
                    entry.WorkoutsPerWeek,
                    entry.WorkoutTypeId
                })
                .OrderBy(entry => entry.TrainingPlanId)
                .ToList()
                .Select(entry => new TrainingPlanViewModel
                {
                    TrainingPlanId = entry.TrainingPlanId,
                    TrainingPlanName = entry.TrainingPlanName,
                    StartDate = entry.StartDate,
                    WorkoutLength = entry.WorkoutLength,
                    EndDate = entry.EndDate,
                    WorkoutsPerWeek = entry.WorkoutsPerWeek,
                    WorkoutTypeId = entry.WorkoutTypeId
                })
                .ToList();

            return trainingPlanInfoList;
        }

        public void addExercises(ExerciseViewModel exerciseInfoForm)
        {
            var exerciseEntity = new Exercise
            {
                ExerciseName = exerciseInfoForm.ExerciseName,
                MuscleGroupId = exerciseInfoForm.MuscleGroupId
            };
            
            this.exerciseRepo.Add(exerciseEntity);
            this.unitOfWork.Commit();
        }
    }
}