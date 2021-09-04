using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class Exercise
    {
        public long ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public long MuscleGroupId { get; set; }

        public virtual MuscleGroup MuscleGroups { get; set; }
        public virtual ICollection<Workout> Workouts { get; private set; }
    }
}