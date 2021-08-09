using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class MuscleGroup
    {
        public long MuscleGroupId { get; set; }
        public string MuscleGroupName { get; set; }  

         public virtual ICollection<Exercise> Exercises { get; private set;}  
    }
}