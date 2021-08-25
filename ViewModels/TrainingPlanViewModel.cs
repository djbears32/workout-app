using System;

namespace workout_app.ViewModels
{
    public class TrainingPlanViewModel
    {
        public long TrainingPlanId { get; set; }
        public string TrainingPlanName { get; set; }
        public DateTime StartDate { get; set; }
        public int WorkoutLength { get; set; }
        public DateTime EndDate { get; set; }
        public int WorkoutsPerWeek { get; set; }
        public long WorkoutTypeId { get; set;}
    }
}