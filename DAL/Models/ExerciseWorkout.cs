using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class ExerciseWorkout
    {
        public int Id { get; set; }
        public int WorkoutId { get; set; }
        public int ExerciseId { get; set; }
        public int Weight { get; set; }
        public string Reps { get; set; }
        public bool Inactive { get; set; }

        public virtual Workout Workouts { get; set; }
        public virtual Exercise Exercises { get; set; }
    }
}