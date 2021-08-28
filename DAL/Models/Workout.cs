using System;
using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public long TrainingPlanId { get; set; }
        public int WeekId { get; set; }
        public int WorkoutDayId { get; set; }
        public DateTime Date { get; set; } 
        public int Weight { get; set; }
        public string Reps { get; set; }
        public string ExerciseId { get; set; } 
         
        public virtual TrainingPlan TrainingPlan { get; set; }
        public virtual Exercise Exercises { get; set; }
        public virtual ICollection<WorkoutSession> WorkoutSession { get; private set;}
    }
}