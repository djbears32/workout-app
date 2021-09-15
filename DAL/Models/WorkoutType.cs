using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class WorkoutType
    {
        public int WorkoutTypeId { get; set; }
        public string WorkoutTypeName { get; set; }   

        public virtual ICollection<TrainingPlan> TrainingPlan { get; private set;}  
    }
}