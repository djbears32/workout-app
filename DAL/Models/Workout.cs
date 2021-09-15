using System;
using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class Workout
    {
        public int WorkoutId { get; set; }
        public int TrainingPlanId { get; set; }
        public DateTime Date { get; set; }
         
        public virtual TrainingPlan TrainingPlan { get; set; }
        public virtual ICollection<Exercise> Exercises { get; set; }
    }
}