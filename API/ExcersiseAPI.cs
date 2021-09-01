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
        DAL.Repositories.IWorkoutTypeRepository workoutTypeRepo;
        DAL.Repositories.IWorkoutSessionRepository workoutSessionRepo;

        public ExerciseAPI(
            DAL.UnitOfWork.IUnitOfWork unitOfWork,
            DAL.Repositories.IExerciseRepository exerciseRepo,
            DAL.Repositories.IMuscleGroupRepository muscleGroupRepo,
            DAL.Repositories.ITrainingPlanRepository trainingPlanRepo,
            DAL.Repositories.IWorkoutTypeRepository workoutTypeRepo,
            DAL.Repositories.IWorkoutSessionRepository workoutSessionRepo)
            {
                this.unitOfWork = unitOfWork;
                this.exerciseRepo = exerciseRepo;
                this.muscleGroupRepo = muscleGroupRepo;
                this.trainingPlanRepo = trainingPlanRepo;
                this.workoutTypeRepo = workoutTypeRepo;
                this.workoutSessionRepo = workoutSessionRepo;
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

        public List<ViewModels.WorkoutTypeViewModel> getWorkoutTypes()
        {
            var workoutTypeInfoList = new List<ViewModels.WorkoutTypeViewModel>();

            var workoutTypeInfo = this.workoutTypeRepo.GetQueryable()
                .Where(x => x.WorkoutTypeId != 0);

            workoutTypeInfoList = workoutTypeInfo
                .Select(entry => new
                {
                    entry.WorkoutTypeId,
                    entry.WorkoutTypeName
                })
                .OrderBy(entry => entry.WorkoutTypeId)
                .ToList()
                .Select(entry => new WorkoutTypeViewModel
                {
                    WorkoutTypeId = entry.WorkoutTypeId,
                    WorkoutTypeName = entry.WorkoutTypeName
                })
                .ToList();

            return workoutTypeInfoList;
        }

        public List<ViewModels.WorkoutSessionViewModel> getWorkoutSessions()
        {
            var workoutSessionInfoList = new List<ViewModels.WorkoutSessionViewModel>();

            var workoutSessionInfo = this.workoutSessionRepo.GetQueryable()
                .Where(x => x.Id != 0);

            workoutSessionInfoList = workoutSessionInfo
                .Select(entry => new
                {
                    entry.Id,
                    entry.TrainingPlanId,
                    entry.WorkoutDate,
                    entry.WeekId,
                    entry.WorkoutDayId,
                    entry.Exercise1,
                    entry.Exercise2,
                    entry.Exercise3,
                    entry.Exercise4,
                    entry.Exercise5,
                    entry.Exercise6,
                    entry.Exercise7,
                    entry.Exercise8,
                    entry.Exercise9
                })
                .OrderBy(entry => entry.Id)
                .ToList()
                .Select(entry => new WorkoutSessionViewModel
                {
                    Id = entry.Id,
                    TrainingPlanId = entry.TrainingPlanId,
                    WorkoutDate = entry.WorkoutDate,
                    WeekId = entry.WeekId,
                    WorkoutDayId = entry.WorkoutDayId,
                    Exercise1 = entry.Exercise1,
                    Exercise2 = entry.Exercise2,
                    Exercise3 = entry.Exercise3,
                    Exercise4 = entry.Exercise4,
                    Exercise5 = entry.Exercise5,
                    Exercise6 = entry.Exercise6,
                    Exercise7 = entry.Exercise7,
                    Exercise8 = entry.Exercise8,
                    Exercise9 = entry.Exercise9
                })
                .ToList();

            return workoutSessionInfoList;
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

        public void addMuscleGroups(MuscleGroupViewModel muscleGroupInfoFrom)
            {
            var muscleGroupEntity = new MuscleGroup
            {
                MuscleGroupName = muscleGroupInfoFrom.MuscleGroupName
            };
            
            this.muscleGroupRepo.Add(muscleGroupEntity);
            this.unitOfWork.Commit();
        }

        public void AddTrainingPlans(TrainingPlanViewModel trainingPlanInfoForm)
        {
            var trainingPlanEntity = new TrainingPlan
            {
                TrainingPlanName = trainingPlanInfoForm.TrainingPlanName,
                StartDate = trainingPlanInfoForm.StartDate,
                WorkoutLength = trainingPlanInfoForm.WorkoutLength,
                EndDate = trainingPlanInfoForm.EndDate,
                WorkoutsPerWeek = trainingPlanInfoForm.WorkoutsPerWeek,
                WorkoutTypeId = trainingPlanInfoForm.WorkoutTypeId
            };
            
            this.trainingPlanRepo.Add(trainingPlanEntity);
            this.unitOfWork.Commit();
        }

        public void AddWorkoutSessions(WorkoutSessionViewModel workoutSessionInfoForm)
        {
            var workoutSessionEntity = new WorkoutSession
            {
                TrainingPlanId = workoutSessionInfoForm.TrainingPlanId,
                WorkoutDate = workoutSessionInfoForm.WorkoutDate,
                WeekId = workoutSessionInfoForm.WeekId,
                WorkoutDayId = workoutSessionInfoForm.WorkoutDayId,
                Exercise1 = workoutSessionInfoForm.Exercise1,
                Exercise2 = workoutSessionInfoForm.Exercise2,
                Exercise3 = workoutSessionInfoForm.Exercise3,
                Exercise4 = workoutSessionInfoForm.Exercise4,
                Exercise5 = workoutSessionInfoForm.Exercise5,
                Exercise6 = workoutSessionInfoForm.Exercise6,
                Exercise7 = workoutSessionInfoForm.Exercise7,
                Exercise8 = workoutSessionInfoForm.Exercise8,
                Exercise9 = workoutSessionInfoForm.Exercise9,
            };

            this.workoutSessionRepo.Add(workoutSessionEntity);
            this.unitOfWork.Commit();
        }
    }
}