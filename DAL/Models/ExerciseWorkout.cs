using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class ExerciseWorkout
    {
        public long EWInfoId { get; set; }
        public long Weight { get; set; }
        public string Reps { get; set; }

        public virtual Workout Workouts { get; set; }
        public virtual Exercise Exercises { get; set; }
    }
}