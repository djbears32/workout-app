using System;

namespace workout_app.DAL.Models
{
    public class Workout
    {
        public long TrainingPlanId { get; set; }
        public int WeekId { get; set; }
        public DateTime Date { get; set; }
        public string Exercise { get; set; }  
        public int Weight { get; set; }
        public string Reps { get; set; }

        public virtual TrainingPlan TrainingPlan { get; set; }
        public virtual Exercise Exercises { get; set; }
    }
}