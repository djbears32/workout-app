using System;

namespace workout_app.ViewModels
{
    public class WorkoutViewModel
    {
        public int WorkoutId { get; set; }
        public int TrainingPlanId { get; set; }
        public DateTime Date { get; set; }
    }
}