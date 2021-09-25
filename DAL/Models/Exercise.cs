using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class Exercise
    {
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public int MuscleGroupId { get; set; }

        public virtual MuscleGroup MuscleGroup { get; set; }
        public virtual ICollection<Workout> Workout { get; private set; }
    }
}