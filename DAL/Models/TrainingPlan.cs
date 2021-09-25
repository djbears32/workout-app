using System;
using System.Collections.Generic;


namespace workout_app.DAL.Models
{
    public class TrainingPlan
    {
        public int TrainingPlanId { get; set; }
        public string TrainingPlanName { get; set; }
        public DateTime StartDate { get; set; }
        public int WorkoutLength { get; set; }
        public DateTime EndDate { get; set; }
        public int WorkoutsPerWeek { get; set; }
        public int WorkoutTypeId { get; set;}

        public virtual WorkoutType WorkoutType { get; set; }
        public virtual ICollection<Workout> Workout { get; private set;}
    }
}