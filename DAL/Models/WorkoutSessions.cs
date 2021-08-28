using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace workout_app.DAL.Models
{
    public class WorkoutSession
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

        public virtual TrainingPlan TrainingPlan { get; set; }
        public virtual Workout Workouts { get; set; }
    }
}