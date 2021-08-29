using System;

namespace workout_app.ViewModels
{
    public class WorkoutSessionViewModel
    {
        public long Id { get; set; }
        public long TrainingPlanId { get; set; }
        public DateTime WorkoutDate { get; set; }
        public int WeekId { get; set; }
        public int WorkoutDayId { get; set; }
        public int Exercise1 { get; set; }
        public int Exercise2 { get; set; }
        public int Exercise3 { get; set; }
        public int Exercise4 { get; set; }
        public int Exercise5 { get; set; }
        public int Exercise6 { get; set; }
        public int Exercise7 { get; set; }
        public int Exercise8 { get; set; }
        public int Exercise9 { get; set; }
    }
}
